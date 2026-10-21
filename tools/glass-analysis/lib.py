import subprocess, numpy as np, json, os
S='/private/tmp/claude-501/-Users-artem-fahrutdinov-Desktop-Projects-webtest/a2fd9e5b-0c4e-42c1-804d-5d5b273638f9/scratchpad'
MG='/opt/homebrew/bin/magick'
def load(p):
    out=subprocess.run([MG,p,'-alpha','off','-depth','8','rgb:-'],capture_output=True).stdout
    w,h=map(int,subprocess.run([MG,'identify','-format','%w %h',p],capture_output=True,text=True).stdout.split())
    return np.frombuffer(out,np.uint8).reshape(h,w,3).astype(np.int16)
def save(a,p):
    a=np.clip(a,0,255).astype(np.uint8); h,w=a.shape[:2]
    subprocess.run([MG,'-size',f'{w}x{h}','-depth','8','rgb:-',p],input=a.tobytes())
_n=[100]
def shot(spec,out,wait=1.2):
    _n[0]+=1; spec=dict(spec); spec['id']=_n[0]+os.getpid()%1000*1000
    f=S+'/_spec.json'; json.dump(spec,open(f,'w'))
    subprocess.run([S+'/shot.sh',f,out,str(wait)])
    return load(out)
import time,re
WEB='/Users/artem_fahrutdinov/Desktop/Projects/webtest/test'
_w=[int(time.time())%100000*100]
TOK=['x']
def wopen(extra=''):
    TOK[0]='t%d'%(int(time.time()*1000)%10**8); open(S+'/tok.txt','w').write(TOK[0])
    subprocess.run(['xcrun','simctl','openurl','booted','http://localhost:8002/test/glass.html?poll&tok=%s%s'%(TOK[0],extra)])
    time.sleep(4)
def wshot(spec,out,wait=0.3,timeout=20):
    """show spec on test/glass.html (poll mode) in simulator Safari, wait for ack, screenshot; returns (img, bar rect css)"""
    _w[0]+=1; spec=dict(spec); spec['id']=_w[0]
    if TOK[0]=='x' and os.path.exists(S+'/tok.txt'): TOK[0]=open(S+'/tok.txt').read().strip()
    json.dump(spec,open(WEB+'/spec.json','w'))
    t0=time.time(); pat=re.compile(r'/ack\?tok=%s&id=%d&bar=([-\d.,]+)'%(TOK[0],_w[0]))
    while time.time()-t0<timeout:
        m=pat.search(open(S+'/w8002.log').read())
        if m: break
        time.sleep(0.1)
    else: raise Exception('no ack')
    time.sleep(wait)
    subprocess.run(['xcrun','simctl','io','booted','screenshot','--type=png',out],capture_output=True)
    return load(out),[float(x) for x in m.group(1).split(',')]
