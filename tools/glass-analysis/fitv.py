import numpy as np
from scipy.optimize import minimize, least_squares
S='/private/tmp/claude-501/-Users-artem-fahrutdinov-Desktop-Projects-webtest/a2fd9e5b-0c4e-42c1-804d-5d5b273638f9/scratchpad'
Z=np.load(S+'/Zv.npy'); Ys=np.arange(764,875,1.0)
q=np.load(S+'/q1d.npy'); gam,a,s1,s2,s3,b=q
# work in px; content row coordinate (px) for 'white below Y' = 3Y
P=np.arange(2000,2800)  # px rows content
def kern(s):
    x=np.arange(-300,301); k=np.exp(-x*x/(2*s*s)); return x,k/k.sum()
def blurred_step(Ypx,top,bot,ka):
    # content: white for rows>=Ypx; clamp to [top,bot]; return function of sample position (px float) via array over grid
    c=(P>=Ypx).astype(float)
    c=np.where(P<top,float(top>=Ypx),c); c=np.where(P>bot,float(bot>=Ypx),c)
    out=np.zeros_like(c)
    for w,s in ka:
        x,k=kern(s); out+=w*np.convolve(np.pad(c,300,mode='edge'),k,'valid')
    return out
def predict(params,rows):
    top,bot,s1v,s2v,s3v,av,bv=params[:7]; d=params[7:]
    ka=[(av,s1v),((1-av)*(1-bv),s2v),((1-av)*bv,s3v)]
    pred=np.zeros((len(rows),len(Ys)))
    for j,Y in enumerate(Ys):
        B=blurred_step(3*Y,top,bot,ka)
        pos=2373+np.array(rows)+d   # sample positions px
        pred[:,j]=np.interp(pos,P,B)
    return pred
rows=list(range(0,186))
x0=[2325,2606,s1,s2,s3,a,b]+[0.0]*186
def res(p): return (predict(p,rows)-Z[rows]).ravel()
r=least_squares(res,x0,diff_step=1e-3,max_nfev=60)
p=r.x
print('top px',p[0],'(pt',p[0]/3,') bot px',p[1],'(pt',p[1]/3,')')
print('kernel s1,s2,s3,a,b',np.round(p[2:7],3))
e=res(p).reshape(186,-1); print('rms z',np.sqrt((e**2).mean()),'max',np.abs(e).max())
print('displacement px by row:',' '.join(f'{i}:{p[7+i]:+.1f}' for i in list(range(0,12))+list(range(12,93,8))+list(range(93,174,8))+list(range(174,186))))
np.save(S+'/vfit.npy',p)
