#!/usr/bin/env python3
"""Check the published Laimo page using Safari's built-in stdio MCP server.

Creates and closes only its own Mac Safari tab. Does not target an iPhone.
Requires Safari with 'safaridriver --mcp'. Writes results only to --out.
"""
import argparse,json,pathlib,select,subprocess,time
ap=argparse.ArgumentParser();ap.add_argument('--out',required=True);a=ap.parse_args()
out=pathlib.Path(a.out).resolve();out.mkdir(parents=True,exist_ok=True)
p=subprocess.Popen(['safaridriver','--mcp'],stdin=subprocess.PIPE,stdout=subprocess.PIPE,stderr=subprocess.PIPE,text=True,bufsize=1)
handle=None;results={};n=1
def rpc(method,params):
 global n
 i=n;n+=1;p.stdin.write(json.dumps({'jsonrpc':'2.0','id':i,'method':method,'params':params})+'\n');p.stdin.flush();end=time.monotonic()+25
 while time.monotonic()<end:
  ready,_,_=select.select([p.stdout,p.stderr],[],[],.2)
  for f in ready:
   line=f.readline()
   if f is p.stderr or not line:continue
   try:r=json.loads(line)
   except json.JSONDecodeError:continue
   if r.get('id')==i:return r
 raise RuntimeError('MCP response timeout')
def call(name,args):
 r=rpc('tools/call',{'name':name,'arguments':args});v=r.get('result',{})
 if 'error' in r or v.get('isError'):raise RuntimeError(json.dumps(r))
 results[name]=v;return v
try:
 rpc('initialize',{'protocolVersion':'2024-11-05','capabilities':{},'clientInfo':{'name':'Laimo browser check','version':'1'}})
 p.stdin.write(json.dumps({'jsonrpc':'2.0','method':'notifications/initialized'})+'\n');p.stdin.flush()
 r=call('create_tab',{'url':'https://f4hrut.github.io/webtest/?v=123'});handle=json.loads(r['content'][0]['text'])['handle']
 call('wait_for_navigation',{'timeout_seconds':20});time.sleep(3)
 call('page_info',{})
 call('evaluate_javascript',{'expression':"return {title:document.title,menu:!!window.ITB,glass:window.ITB&&ITB.gls()?{on:ITB.gls().on,err:ITB.gls().err}:null,ready:document.readyState,viewport:[innerWidth,innerHeight]};"})
 call('browser_console_messages',{'level_filter':['error','warn'],'clear':False,'limit':30})
 call('list_network_requests',{'filter':{'status_min':400},'clear':False})
finally:
 if handle:
  try:call('close_tab',{'handle':handle})
  except Exception as e:results['close_error']=str(e)
 p.terminate()
 try:p.wait(timeout=3)
 except subprocess.TimeoutExpired:p.kill();p.wait()
 (out/'safari-mcp-result.json').write_text(json.dumps(results,ensure_ascii=False,indent=2))
print(json.dumps(results,ensure_ascii=False))
