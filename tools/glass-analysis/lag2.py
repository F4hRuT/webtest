import sys,glob
sys.path.insert(0,'/private/tmp/claude-501/-Users-artem-fahrutdinov-Desktop-Projects-webtest/a2fd9e5b-0c4e-42c1-804d-5d5b273638f9/scratchpad')
from lib import *
def limetop(a,y0=0):
    m=(a[:,150:300,0]>140)&(a[:,150:300,1]>170)&(a[:,150:300,2]<90)
    r=np.where(m.sum(1)>2)[0]; return r[0]+y0 if len(r) else None
ref=load(S+'/w_black.png'); off=limetop(ref)-2118; print('icon top offset from bar top',off)
fs=sorted(glob.glob(S+'/ef/f*.png')); ts=[float(x) for x in open(S+'/ef/t.txt').read().split()]
calY=np.load(S+'/cal_y.npy')[1:]; calP=np.load(S+'/cal_prof.npy')[1:]
Yf=np.arange(calY[0],calY[-1],0.25); Pf=np.stack([np.interp(Yf,calY,calP[:,r]) for r in range(calP.shape[1])],1)
out=[]
for f,t in zip(fs,ts):
    A=load(f).astype(float); a=A[:,:,1]
    lt=limetop(A)
    if lt is None: continue
    bt=lt-off  # bar top row in crop
    col=a[:,20]; idx=np.where(col>128)[0]
    if len(idx)==0: continue
    E=idx[0]-bt       # edge relative to bar top (px)
    if E<-130 or E>240: continue
    p=a[bt:bt+186,603]
    if len(p)<186: continue
    errs=((Pf-p)**2).mean(1); j=np.argmin(errs)
    Eg=(Yf[j]-791)*3
    out.append((t,E,Eg,errs[j],bt))
out=np.array(out); v=np.gradient(out[:,1]+out[:,4],out[:,0])
for row,vv in zip(out,v): print(f't {row[0]:6.3f} bartop {row[4]+1700:5.0f} edge {row[1]:6.0f} glass {row[2]:7.1f} diff {row[2]-row[1]:+6.1f}px speed {vv:+6.0f}px/s lag {1000*(row[2]-row[1])/vv if abs(vv)>100 else float("nan"):+6.1f}ms fit {row[3]:.1f}')
