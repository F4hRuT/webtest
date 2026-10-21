from lib import *
d=np.load(S+'/colK_t1.npz'); t=np.load(S+'/tinted.npz')
keys=d.files
D=[d[k].astype(float) for k in keys]; C=[[float(x) for x in k.split('_')] for k in keys]
# add tinted sweeps (tab1, icons off) for more equations
for k in t.files:
    D.append(t[k].astype(float)); C.append([float(k[1:])]*3 if k[0]=='g' else [float(x) for x in k[1:].split('_')])
D=np.stack(D); C=np.array(C)                      # n,342,1206,3 ; n,3
G=D[:,150:225,760:840].reshape(len(D),-1,3).mean(1)   # glass colour (interior, no capsule)
w=np.array([.2126,.7152,.0722]); LG=G@w; n=len(D)
# out_c = A + Kl*L_G + Kc*(G_c-L_G) + beta*bg_c
X=np.zeros((n,3,4)); X[:,:,0]=1; X[:,:,1]=LG[:,None]; X[:,:,2]=G-LG[:,None]; X[:,:,3]=C
X=X.reshape(n*3,4)
Y=D.transpose(1,2,0,3).reshape(342,1206,n*3)
W=((Y>1.5)&(Y<253.5)).astype(float)
XtX=np.einsum('hwk,ki,kj->hwij',W,X,X)+np.eye(4)*1e-6
XtY=np.einsum('hwk,ki,hwk->hwi',W,X,Y)
P=np.linalg.solve(XtX,XtY[...,None])[...,0]
res=np.abs(np.einsum('ki,hwi->hwk',X,P)-Y)*W
r=res.max(-1)
print('fit max err in bar box: p50 %.2f p95 %.2f p99 %.2f'%tuple(np.percentile(r[90:282,60:1146],[50,95,99])))
np.save(S+'/kmaps2.npy',P)
A,Kl,Kc,B=[P[...,i] for i in range(4)]
y0=93
for x in [63,64,65,66,67,70,75,90,120]:
    print('row mid (y+93) x',x,' A %.1f Kl %.3f Kc %.3f beta %.3f'%(A[y0+93,x],Kl[y0+93,x],Kc[y0+93,x],B[y0+93,x]))
for yy in [0,1,2,3,5,10,93]:
    print('col 800 row',yy,' A %.1f Kl %.3f Kc %.3f beta %.3f'%(A[y0+yy,800],Kl[y0+yy,800],Kc[y0+yy,800],B[y0+yy,800]))
# symmetry check
L=P[93:279,63:63+130]; R=P[93:279,1143-130:1143][:,::-1]
print('left/right mirror diff: A %.2f Kl %.3f Kc %.3f beta %.3f (mean abs)'%tuple(np.abs(L-R).mean((0,1))))
