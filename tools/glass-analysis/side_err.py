import numpy as np, sys
from lib import load, S
from scipy import ndimage
ib=load(S+'/k_black_tint.png')[:,:,1].astype(int)[2373:2559]; wb=load(S+'/w2_black.png')[:,:,1].astype(int)[2118:2304]
icon=ndimage.binary_dilation((ib>50)|(wb>50),iterations=5); icon[:12]=False; icon[-12:]=False
bar=ndimage.binary_erosion((ib>3)&(wb>3),iterations=1); dist=ndimage.distance_transform_edt(bar)
pre=sys.argv[1] if len(sys.argv)>1 else 'site'
for P in [int(x) for x in sys.argv[2].split(',')]:
    a=load(S+f'/{pre}_ios_{P}.png')[2373:2559].astype(int); w=load(S+f'/{pre}_web_{P}.png')[2118:2304].astype(int); d=(w-a)
    H,W=bar.shape; yy,xx=np.mgrid[0:H,0:W]
    out=[]
    for lo,hi in [(1,4),(4,15),(15,40)]:
        m=bar&~icon&(dist>=lo)&(dist<hi)
        for nm,sel in [('top',yy<60),('bot',yy>126)]:
            e=d[m&sel].mean(axis=1) if (m&sel).any() else np.array([0]); out.append('%s%d-%d %+.1f/%.1f'%(nm,lo,hi,e.mean(),np.sqrt((e**2).mean())))
    print(P,'  '.join(out))
