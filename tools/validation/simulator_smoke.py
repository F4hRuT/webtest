#!/usr/bin/env python3
"""Smoke-check Laimo in an existing iOS simulator. Never controls a physical iPhone.

Requires xcrun/simctl and FFmpeg/ffprobe. Instruments HTML in memory only.
Writes temporary screenshots, video and JSON to the explicit --out directory.
"""
import argparse,contextlib,http.server,json,pathlib,subprocess,threading,time,signal
p=argparse.ArgumentParser();p.add_argument('--root',required=True);p.add_argument('--out',required=True);p.add_argument('--simulator-udid',required=True);a=p.parse_args()
root=pathlib.Path(a.root).resolve();out=pathlib.Path(a.out).resolve();out.mkdir(parents=True,exist_ok=True)
done=threading.Event();result={};requests=[]
hook="""<script>window.__probe={errors:[],resources:[],console:[]};addEventListener('error',function(e){if(e.target!==window){__probe.resources.push({tag:e.target.tagName,url:e.target.src||e.target.href});return}__probe.errors.push({message:e.message,line:e.lineno})},true);addEventListener('unhandledrejection',function(e){__probe.errors.push({rejection:String(e.reason)})});['error','warn'].forEach(function(k){var f=console[k];console[k]=function(){__probe.console.push({level:k,text:Array.prototype.map.call(arguments,String).join(' ')});return f.apply(console,arguments)}});addEventListener('load',function(){setTimeout(async function(){var r={states:[]};try{console.warn('__probe_sentinel__');r.page={title:document.title,version:(document.querySelector('.foot')||{}).textContent,dpr:devicePixelRatio,viewport:[innerWidth,innerHeight],menu:!!window.ITB,glass:window.ITB&&ITB.gls()?{on:ITB.gls().on,err:ITB.gls().err}:null,backdrop:CSS.supports('backdrop-filter','blur(1px)'),mask:CSS.supports('mask-image','linear-gradient(#000,#000)')};for(var i of [1,2,3,0]){ITB.set(i);await new Promise(x=>setTimeout(x,800));r.states.push({screen:+document.querySelector('.scr.on').dataset.scr,selected:Array.from(document.querySelectorAll('#itb-tabs button')).findIndex(x=>x.getAttribute('aria-selected')==='true')})}r.capture=__probe}catch(e){r.failure=String(e)}fetch('/__probe_result',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(r)})},2500)})</script>"""
class Handler(http.server.SimpleHTTPRequestHandler):
 def __init__(self,*args,**kw):super().__init__(*args,directory=str(root),**kw)
 def log_message(self,*args):pass
 def send_response(self,code,message=None):requests.append({'path':self.path,'status':code});super().send_response(code,message)
 def do_GET(self):
  if self.path.split('?')[0] in ('/','/index.html'):
   b=(root/'index.html').read_text().replace('<head>','<head>'+hook,1).encode()
   self.send_response(200);self.send_header('Content-Type','text/html; charset=utf-8');self.send_header('Cache-Control','no-store');self.send_header('Content-Length',str(len(b)));self.end_headers();self.wfile.write(b)
  else:super().do_GET()
 def do_POST(self):
  if self.path!='/__probe_result':self.send_error(404);return
  data=json.loads(self.rfile.read(int(self.headers['Content-Length'])));result.update(data)
  self.send_response(200);self.end_headers();self.wfile.write(b'ok');done.set()
server=http.server.ThreadingHTTPServer(('127.0.0.1',0),Handler);threading.Thread(target=server.serve_forever,daemon=True).start()
dev=a.simulator_udid;rec=None;log=(out/'record-direct.log').open('w')
try:
 rec=subprocess.Popen(['xcrun','simctl','io',dev,'recordVideo','--codec=h264','--force',str(out/'simulator.mp4')],stdout=log,stderr=log)
 time.sleep(.5)
 subprocess.run(['xcrun','simctl','openurl',dev,'http://localhost:'+str(server.server_port)+'/?v=123'],check=True,capture_output=True)
 if not done.wait(25):raise RuntimeError('No browser self-test callback')
 subprocess.run(['xcrun','simctl','io',dev,'screenshot',str(out/'simulator.png')],check=True,capture_output=True)
 time.sleep(.3);rec.send_signal(signal.SIGINT);rec.wait(timeout=15);rec=None
 result['requests']=requests;result['source_instrumented_in_memory']=True;result['target']='simulator'
 result['video']=json.loads(subprocess.check_output(['/opt/homebrew/bin/ffprobe','-v','error','-select_streams','v:0','-count_frames','-show_entries','stream=width,height,nb_read_frames,r_frame_rate,avg_frame_rate,duration','-of','json',str(out/'simulator.mp4')],text=True))
 frames=json.loads(subprocess.check_output(['/opt/homebrew/bin/ffprobe','-v','error','-select_streams','v:0','-show_frames','-show_entries','frame=best_effort_timestamp_time','-of','json',str(out/'simulator.mp4')],text=True))['frames']
 ts=[float(f['best_effort_timestamp_time']) for f in frames];result['frame_timestamps']={'count':len(ts),'monotonic':all(y>x for x,y in zip(ts,ts[1:])),'max_gap_ms':round(max((y-x)*1000 for x,y in zip(ts,ts[1:])),2)}
 subprocess.run(['/opt/homebrew/bin/ffmpeg','-y','-hide_banner','-loglevel','error','-i',str(out/'simulator.mp4'),'-ss','4','-frames:v','1',str(out/'video-frame.png')],check=True)
 print(json.dumps(result,ensure_ascii=False),flush=True)
 assert result.get('page',{}).get('menu') and result['page']['glass']['on'],result
 assert not result.get('failure') and not result['capture']['errors'] and not result['capture']['resources'],result
 assert result['capture']['console']==[{'level':'warn','text':'__probe_sentinel__'}],result
 assert result['states']==[{'screen':i,'selected':i} for i in [1,2,3,0]],result['states']
finally:
 if rec:
  rec.send_signal(signal.SIGINT)
  with contextlib.suppress(Exception):rec.wait(timeout=10)
 log.close();server.shutdown();server.server_close();(out/'simulator-result.json').write_text(json.dumps(result,ensure_ascii=False,indent=2))
