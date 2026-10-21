from lib import *
from scipy import ndimage
d=np.load(S+'/colK_t1.npz')
keys=d.files
D=np.stack([d[k].astype(float) for k in keys])           # n,342,1206,3
G=D[:,186,800,:]                                           # glass colour per shot (interior)
w709=np.array([.2126,.7152,.0722]); LG=G@w709
n=len(keys)
# per pixel least squares over (shot,channel): out = A + Kl*L + Kc*(G_c-L)
X=np.zeros((n,3,3)); X[:,:,0]=1; X[:,:,1]=LG[:,None]; X[:,:,2]=G-LG[:,None]
X=X.reshape(n*3,3)
Y=D.transpose(1,2,0,3).reshape(342,1206,n*3)
W=((Y>1.5)&(Y<253.5)).astype(float)
XtX=np.einsum('hwk,ki,kj->hwij',W,X,X)+np.eye(3)*1e-6
XtY=np.einsum('hwk,ki,hwk->hwi',W,X,Y)
P=np.linalg.solve(XtX,XtY[...,None])[...,0]
A,Kl,Kc=P[...,0],P[...,1],P[...,2]
res=np.abs(np.einsum('ki,hwi->hwk',X,P)-Y)*W
print('fit max err rim region',np.percentile(res[93:279,63:1143].max(-1),[50,95,99]))
# geometry from iOS bar mask (over black: inside if >14)
u0=D[keys.index('0_0_0')][:,:,1]
inside=ndimage.binary_fill_holes(u0>3)
edt=ndimage.distance_transform_edt(inside)
t=edt-0.5
sm=ndimage.gaussian_filter(edt,1.5); gy,gx=np.gradient(sm)
th=np.degrees(np.arctan2(np.abs(gy),np.abs(gx)+1e-9))
np.savez(S+'/kmaps.npz',A=A,Kl=Kl,Kc=Kc,t=t,th=th,inside=inside)
for r in [93,94,95,96,97,100,105,120,150,186]:
    print('row',r-93,'t',round(t[r,603],1),'Kl',round(Kl[r,603],3),'Kc',round(Kc[r,603],3),' left cap mid x63..',[ (round(t[186,x],1),round(Kl[186,x],2),round(Kc[186,x],2)) for x in [63,64,65,66,70] ][:3] if r==186 else '')
