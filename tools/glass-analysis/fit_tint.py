import numpy as np
from scipy.optimize import minimize
S='/private/tmp/claude-501/-Users-artem-fahrutdinov-Desktop-Projects-webtest/a2fd9e5b-0c4e-42c1-804d-5d5b273638f9/scratchpad'
d=np.load(S+'/tinted.npz')
vals=np.array(list(range(0,256,8))+[255],float)
gl=np.array([d['g%d'%int(v)][150:225,760:840,1].mean() for v in vals])
print('tinted gray LUT',np.round(gl,1).tolist())
w=np.array([.2126,.7152,.0722])
IN=[];OUT=[]
for k in d.files:
    if k[0]!='c': continue
    IN.append([float(x) for x in k[1:].split('_')]); OUT.append(d[k][150:225,760:840].reshape(-1,3).mean(0))
IN=np.array(IN);OUT=np.array(OUT)
def g(x): return np.interp(x,vals,gl)
L=IN@w; Lo=OUT@w
print('lum check (Lo vs g(L)) max diff',np.round(np.abs(Lo-g(L)).max(),2))
ch=IN-L[:,None]; cho=OUT-Lo[:,None]
ok=(OUT>2).all(1)&(OUT<253).all(1)
rat=[];LL=[]
for i in range(len(IN)):
    m=np.abs(ch[i])>25
    if ok[i] and m.any(): rat.append(np.median(cho[i][m]/ch[i][m])); LL.append(L[i])
rat=np.array(rat);LL=np.array(LL)
A=np.stack([np.ones_like(LL),LL],1); c,_,_,_=np.linalg.lstsq(A,rat,rcond=None)
print('ratio r(L) = %.4f %+.6f*L'%(c[0],c[1]),' resid max',np.round(np.abs(A@c-rat).max(),3))
pred=np.clip(g(L)[:,None]+(c[0]+c[1]*L)[:,None]*ch,0,255)
e=np.abs(pred-OUT); print('model error: mean %.2f p95 %.2f max %.2f'%(e.mean(),np.percentile(e,95),e.max()))
for i in np.argsort(-e.max(1))[:5]: print('  ',IN[i].astype(int),OUT[i].round().astype(int),pred[i].round().astype(int))
lut=np.interp(np.arange(256),vals,gl); print('LUT256='+','.join(f'{x:.1f}' for x in lut))
np.save(S+'/tint_rc.npy',c)
