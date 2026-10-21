from lib import *
from scipy import ndimage
import sys
POS=[int(x) for x in (sys.argv[1:] or ['150','380','690','1560','1650','1900','3110'])]
subprocess.run(['xcrun','simctl','launch','booted','local.test.glass'],capture_output=True); time.sleep(2)
IOS={}
for P in POS:
    IOS[P]=shot({'bg':[0,0,0],'img':'page3x.png','imgY':791-P,'tab':0,'icons':True,'scroll':False},S+f'/site_ios_{P}.png',1.3)
wopen()
ib=load(S+'/k_black_tint.png')[:,:,1].astype(int)[2373:2559]; wb=load(S+'/w2_black.png')[:,:,1].astype(int)[2118:2304]
icon=ndimage.binary_dilation((ib>50)|(wb>50),iterations=5); icon[:12]=False; icon[-12:]=False
bar=ndimage.binary_erosion((ib>3)&(wb>3),iterations=1); dist=ndimage.distance_transform_edt(bar)
caps=np.zeros_like(icon)
for P in POS:
    w,b=wshot({'bg':[0,0,0],'img':'page3x.png','imgY':791-P,'wait':1200},S+f'/site_web_{P}.png',0.4)
    a=IOS[P][2373:2559].astype(int); ww=w[2118:2304].astype(int); d=ww-a
    out=[]
    for lo,hi in [(1,4),(4,30),(30,999)]:
        m=bar&~icon&(dist>=lo)&(dist<hi); e=d[m]; out.append(f'{np.sqrt((e**2).mean()):5.2f}/{np.percentile(np.abs(e),95):4.0f}')
    print(f'P={P:5d}  rms/p95: rim {out[0]}  1.3-10pt {out[1]}  deep {out[2]}')
    M='/opt/homebrew/bin/magick'
    subprocess.run([M,S+f'/site_ios_{P}.png','-crop','1206x330+0+2290',S+'/_a.png']); subprocess.run([M,S+f'/site_web_{P}.png','-crop','1206x330+0+2035',S+'/_b.png'])
    subprocess.run([M,S+'/_a.png',S+'/_b.png','-append','-resize','50%',S+f'/pair_{P}.png'])
