import numpy as np
from scipy import ndimage
S='/private/tmp/claude-501/-Users-artem-fahrutdinov-Desktop-Projects-webtest/a2fd9e5b-0c4e-42c1-804d-5d5b273638f9/scratchpad'
d=np.load(S+'/gray.npz')
vals=np.array(list(range(0,256,8))+[255],float)
gl=np.array([d[f'plain_{int(v)}'][186,603,1] for v in vals],float)
vf=np.load(S+'/vfit.npy'); top,bot,s1,s2,s3,a,b=vf[:7]; dv=vf[7:]
gam=np.load(S+'/q1d.npy')[0]
# chroma ratio r(L): fitted linear from colour data
def r_of_L(L): return np.clip(0.85-0.00092*L,0.5,0.9)
# bar mask from u0/u255 of tab1 sweep (K map): bar = where u255 differs from 255 at center rows
w=np.load(S+'/sweep2d_t1.npz')
u1=w['u255'][:,:,1].astype(float)  # crop rows 2280..2621
mask=np.zeros((2622,1206),bool); mask[2280:2622]=u1<250
# displacement profile D(t) (px, + = inward) from vertical fit: average of top and bottom
t=np.arange(0,93)
Dtop=dv[:93]; Dbot=-dv[185:92:-1]
D=(Dtop+Dbot)/2
D[60:]=0
def disp_field(mask):
    inside=ndimage.distance_transform_edt(mask)-0.5   # distance to edge in px
    sm=ndimage.gaussian_filter(inside.astype(float),2)
    gy,gx=np.gradient(sm); n=np.hypot(gx,gy)+1e-9
    Dt=np.interp(inside,t,D)
    return Dt*gx/n, Dt*gy/n, inside   # displacement toward increasing distance (= inward)
def gk(s):
    n=int(4*s)+1; x=np.arange(-n,n+1); k=np.exp(-x*x/(2*s*s)); return k/k.sum()
def blur2(img,s):
    out=ndimage.convolve1d(img,gk(s),axis=0,mode='nearest'); return ndimage.convolve1d(out,gk(s),axis=1,mode='nearest')
X0,X1,Y0,Y1=15,1191,int(round(top)),int(round(bot))+1
def glass(content):
    """content: (2622,1206,3) uint8/float sRGB. returns G (glass colour before rim) over full screen"""
    c=content.astype(float)/255
    reg=c[Y0:Y1,X0:X1]**gam    # clamp region (edge mode 'nearest' in blur = clamp)
    B=a*blur2(reg,max(s1,0.3))+(1-a)*((1-b)*blur2(reg,s2)+b*blur2(reg,s3))
    dx,dy,inside=disp_field(mask)
    yy,xx=np.mgrid[0:2622,0:1206].astype(float)
    sx=np.clip(xx+dx-X0,0,X1-X0-1); sy=np.clip(yy+dy-Y0,0,Y1-Y0-1)
    out=np.zeros_like(c)
    for ch in range(3):
        out[:,:,ch]=ndimage.map_coordinates(B[:,:,ch],[sy,sx],order=1,mode='nearest')
    v=255*np.clip(out,0,1)**(1/gam)
    L=v@np.array([.2126,.7152,.0722])
    G=np.interp(L,vals,gl)[:,:,None]+r_of_L(L)[:,:,None]*(v-L[:,:,None])
    return np.clip(G,0,255), inside
