exec(open('/private/tmp/claude-501/-Users-artem-fahrutdinov-Desktop-Projects-webtest/a2fd9e5b-0c4e-42c1-804d-5d5b273638f9/scratchpad/prep.py').read())
from scipy.optimize import minimize
import glob
# collect 1D cases: input row (1206) and measured G profile (center band avg), x-range 300..900
cases=[]
e=np.load(S+'/edges.npz')
def add(inp,img):
    g=np.nanmean(Gm(img.astype(float))[150:225],0); cases.append((inp.astype(float),g))
def rowedge(X,a,b,left=False):
    r=np.full(1206,float(a)); 
    if left: r[:int(round(X*3))]=b
    else: r[int(round(X*3)):]=b
    return r
add(rowedge(201,0,255),e['v201']); add(rowedge(201,0,128),e['v201_0_128']); add(rowedge(201,128,255),e['v201_128_255']); add(rowedge(201,64,192),e['v201_64_192'])
for w in [1,3,10]:
    r=np.zeros(1206); r[int(round((201-w/2)*3)):int(round((201+w/2)*3))]=255
    L=np.load(S+f'/lsf_{w}.npy') # these were Linv; regenerate G from L via g
    cases.append((r,np.interp(L*255,vals,gl)))
# stripes: reload screenshots? they were overwritten; regenerate quickly below if needed
X0,X1=330,880
def gauss_k(s):
    n=int(4*s)+1; x=np.arange(-n,n+1); k=np.exp(-x*x/(2*s*s)); return k/k.sum()
def conv(y,k): 
    p=len(k)//2; yp=np.pad(y,p,mode='edge'); return np.convolve(yp,k,'valid')
def model(q,inp):
    gam,a,s1,s2,s3,b=q
    y=(np.clip(inp,0,255)/255)**gam
    z=a*conv(y,gauss_k(max(s1,.3)))+(1-a)*((1-b)*conv(y,gauss_k(s2))+b*conv(y,gauss_k(s3)))
    Lz=255*np.clip(z,0,1)**(1/gam)
    return np.interp(Lz,vals,gl)
def loss(q):
    if q[0]<0.3 or q[1]<0 or q[1]>0.5 or q[5]<0 or q[5]>1 or min(q[2:5])<0.3: return 1e9
    return np.mean([np.mean((model(q,i)[X0:X1]-o[X0:X1])**2) for i,o in cases])
best=None
for x0 in [[1,.1,2,40,80,.3],[.9,.08,2,30,60,.5],[1,.1,2,45,45,0]]:
    r=minimize(loss,x0,method='Nelder-Mead',options={'maxiter':6000,'xatol':1e-5,'fatol':1e-9})
    if best is None or r.fun<best.fun: best=r
q=best.x; print('params gam,a,s1,s2,s3,b =',np.round(q,3),'rms',round(np.sqrt(best.fun),3))
for (i,o),nm in zip(cases,['e0_255','e0_128','e128_255','e64_192','l1','l3','l10']):
    m=model(q,i); print(nm,'maxerr',round(np.nanmax(np.abs(m-o)[X0:X1]),2))
np.save(S+'/q1d.npy',q)
