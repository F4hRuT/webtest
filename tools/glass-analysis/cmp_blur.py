from lib import *
from scipy import ndimage
import sys
specs={
 'edge0_255':{'bg':[0,0,0],'rects':[[201,0,201,874,255,255,255]]},
 'edge0_128':{'bg':[0,0,0],'rects':[[201,0,201,874,128,128,128]]},
 'edgeR255':{'bg':[0,0,0],'rects':[[280,0,122,874,255,255,255]]},
 'hedge805':{'bg':[0,0,0],'rects':[[0,805,402,69,255,255,255]]},
 'hedge822':{'bg':[0,0,0],'rects':[[0,822,402,52,255,255,255]]},
 'hedge840':{'bg':[0,0,0],'rects':[[0,840,402,34,255,255,255]]},
 'hedge785':{'bg':[0,0,0],'rects':[[0,785,402,89,255,255,255]]},
 'stripes24':{'bg':[0,0,0],'img':'p24_0_255.png'},
 'site1':{'bg':[0,0,0],'img':'site1.png'},
 'gray128':{'bg':[128,128,128]},'white':{'bg':[255,255,255]},'lime':{'bg':[182,215,10]},'red':{'bg':[255,0,0]},'blue':{'bg':[0,0,255]},'card':{'bg':[28,28,30]},
}
only=sys.argv[1:] or list(specs)
ib=load(S+'/k_black.png')[:,:,1].astype(int)[2373:2559]; wb=load(S+'/w_black.png')[:,:,1].astype(int)[2118:2304]
icon=ndimage.binary_dilation((ib>45)|(wb>45),iterations=5); icon[:12]=False; icon[-12:]=False
caps=np.zeros_like(icon); caps[:,63:380]=True   # first-tab capsule region (opaque in stage 1)
bar=ndimage.binary_erosion((ib>3)&(wb>3),iterations=1)
dist=ndimage.distance_transform_edt(bar)
res={}
subprocess.run(['xcrun','simctl','launch','booted','local.test.glass'],capture_output=True); time.sleep(2)
IOS={k:shot(dict(specs[k],tab=0,icons=True,scroll=False),S+f'/cmp_ios_{k}.png',1.2)[2373:2559].astype(int) for k in only}
wopen()
for k in only:
    sp=specs[k]; a=IOS[k]
    w,b=wshot(sp,S+f'/cmp_web_{k}.png',0.4); w=w[2118:2304].astype(int)
    res[k]=(a,w)
    d=(w-a)
    for lo,hi,lab in [(1,4,'rim <1.3pt'),(4,30,'1.3-10pt'),(30,999,'>10pt')]:
        m=bar&~icon&~caps&(dist>=lo)&(dist<hi)
        e=d[m]
        print(f'{k:10s} {lab:11s} mean {e.mean():+5.2f} rms {np.sqrt((e**2).mean()):5.2f} p95 {np.percentile(np.abs(e),95):5.1f} max {np.abs(e).max():4d}')
np.savez_compressed(S+'/cmp_blur.npz',**{k+'_ios':v[0] for k,v in res.items()},**{k+'_web':v[1] for k,v in res.items()})
