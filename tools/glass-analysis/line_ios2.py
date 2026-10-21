from lib import *
import sys, json
mode=sys.argv[1]; DS=[float(x) for x in sys.argv[2].split(',')]
subprocess.run(['xcrun','simctl','launch','booted','local.test.glass'],capture_output=True); time.sleep(2)
out={}
for d in DS:
    if mode=='top': r=[0,791+d,402,1/3,255,255,255]
    elif mode=='bot': r=[0,853+d,402,1/3,255,255,255]
    else: r=[21+d,700,1/3,174,255,255,255]
    a=shot({'bg':[0,0,0],'rects':[r],'tab':3,'icons':False,'scroll':False},S+'/lni.png',0.7)[:,:,1].astype(int)
    if mode=='side': c=a[2373+93,63:63+90]
    else: c=a[2373:2373+186,810]
    out[d]=c.tolist()
    print(mode,'d=%6.2f'%d,' '.join('%3d'%v for v in (c[:12] if mode!='bot' else c[-12:])),' mean=%.2f'%c.mean())
json.dump(out,open(S+f'/line_{mode}.json','w'))
