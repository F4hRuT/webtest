import numpy as np
S='/private/tmp/claude-501/-Users-artem-fahrutdinov-Desktop-Projects-webtest/a2fd9e5b-0c4e-42c1-804d-5d5b273638f9/scratchpad'
d=np.load(S+'/gray.npz')
vals=np.array(list(range(0,256,8))+[255],float)
gl=np.array([d[f'plain_{int(v)}'][186,603,1] for v in vals],float)
q=np.load(S+'/q1d.npy'); gam=q[0]
w=np.load(S+'/sweep2d_t1.npz')
u0=w['u0'][:,:,1].astype(float); u1=w['u255'][:,:,1].astype(float)
K=(u1-u0)/(gl[-1]-gl[0]); A=u0-K*gl[0]
Kok=np.abs(K)>0.2
def Z(img): 
    g=(img.astype(float)-A)/np.where(Kok,K,1); return (np.interp(g,gl,vals)/255)**gam
Xs=np.arange(0,216,1.0); Ys=np.arange(764,875,1.0)
ZX=np.stack([Z(w[f'x{X:g}']) for X in Xs])   # fraction white = P(sample_x > X)
ZY=np.stack([Z(w[f'y{Y:g}']) for Y in Ys])
def median_pos(Zs,grid):
    # Zs: (n, H, W) decreasing along n; find crossing 0.5
    n=Zs.shape[0]; below=Zs<=0.5
    idx=np.argmax(below,axis=0)  # first index where <=0.5
    ok=below.any(0)&(idx>0)
    i1=np.clip(idx,1,n-1); i0=i1-1
    z0=np.take_along_axis(Zs,i0[None],0)[0]; z1=np.take_along_axis(Zs,i1[None],0)[0]
    t=(z0-0.5)/np.where(z0-z1==0,1,z0-z1)
    pos=grid[i0]+t*(grid[1]-grid[0])
    return np.where(ok,pos,np.nan)
mx=median_pos(ZX,Xs); my=median_pos(ZY,Ys)
H,W=mx.shape
yy,xx=np.mgrid[0:H,0:W]
dx=mx-xx/3; dy=my-(yy+2280)/3
np.savez(S+'/disp_t1.npz',dx=dx,dy=dy,K=K,A=A)
# print grids: rows crop 93..279, cols 63..
rows=[93,94,95,96,99,105,115,130,150,186,222,242,257,267,273,276,277,278]
cols=[63,64,65,66,69,75,85,100,120,140,160,180,200,250,300,400,500]
print('dx (pt), rows=offset from bar top; cols=px')
print('     '+''.join(f'{c:6d}' for c in cols))
for r in rows: print(f'{r-93:4d} '+''.join(f'{dx[r,c]:6.1f}' for c in cols))
print('dy (pt)')
for r in rows: print(f'{r-93:4d} '+''.join(f'{dy[r,c]:6.1f}' for c in cols))
