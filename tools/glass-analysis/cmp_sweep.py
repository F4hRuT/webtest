from lib import *
from scipy import ndimage
import sys
POS=list(range(int(sys.argv[1]),int(sys.argv[2]),int(sys.argv[3]))); img=sys.argv[4] if len(sys.argv)>4 else 'page3x.png'; tag=sys.argv[5] if len(sys.argv)>5 else 'sw'
subprocess.run(['xcrun','simctl','launch','booted','local.test.glass'],capture_output=True); time.sleep(2)
for P in POS: shot({'bg':[0,0,0],'img':img,'imgY':791-P,'tab':0,'icons':True,'scroll':False},S+f'/{tag}_ios_{P}.png',1.0)
wopen()
for P in POS: wshot({'bg':[0,0,0],'img':img,'imgY':791-P,'wait':2200},S+f'/{tag}_web_{P}.png',0.4)
ib=load(S+'/k_black_tint.png')[:,:,1].astype(int)[2373:2559]; wb=load(S+'/w2_black.png')[:,:,1].astype(int)[2118:2304]
icon=ndimage.binary_dilation((ib>50)|(wb>50),iterations=5); icon[:12]=False; icon[-12:]=False
bar=ndimage.binary_erosion((ib>3)&(wb>3),iterations=1); dist=ndimage.distance_transform_edt(bar)
# capsule zone of tab 0 differs between the test app (wider) and ours: leave it out
cap=np.zeros_like(bar); cap[:,60:380]=True
allr=[]
for P in POS:
    a=load(S+f'/{tag}_ios_{P}.png')[2373:2559].astype(int); w=load(S+f'/{tag}_web_{P}.png')[2118:2304].astype(int); d=w-a
    row=[]
    for lo,hi in [(1,4),(4,30),(30,999)]:
        m=bar&~icon&~cap&(dist>=lo)&(dist<hi); e=d[m]; row.append((np.sqrt((e**2).mean()),np.percentile(np.abs(e),95))); allr.append((lo,e))
    print('P=%5d  rim %.2f/%2.0f   1.3-10pt %.2f/%2.0f   deep %.2f/%2.0f'%(P,*row[0],*row[1],*row[2]))
for lo in [1,4,30]:
    e=np.concatenate([x for l,x in allr if l==lo]); print('ALL',lo,'rms %.2f p95 %.0f p99 %.0f'%(np.sqrt((e**2).mean()),np.percentile(np.abs(e),95),np.percentile(np.abs(e),99)))
