from lib import *
from scipy.optimize import minimize
d=np.load('gray.npz'); c=np.load('col.npz')
vals=np.array(list(range(0,256,8))+[255],float)
gl=np.array([d[f'plain_{int(v)}'][186,603,1] for v in vals],float)
def g(x): return np.interp(x,vals,gl,left=gl[0]+(x-0)*(gl[1]-gl[0])/8, right=None) if False else np.interp(x,vals,gl)
def gx(x): # extrapolating g
    y=np.interp(x,vals,gl); lo=x<0; hi=x>255
    y=np.where(lo,gl[0]+x*(gl[1]-gl[0])/8,y); y=np.where(hi,gl[-1]+(x-255)*(gl[-1]-gl[-2])/7,y); return y
IN=[];OUT=[]
for k in c.files:
    IN.append([float(t) for t in k.split('_')]); OUT.append(c[k][186,603].astype(float))
IN=np.array(IN);OUT=np.array(OUT)
def lin(v): v=v/255; return np.where(v<=0.04045,v/12.92,((v+0.055)/1.055)**2.4)
def srgb(l): l=np.clip(l,0,None); return 255*np.where(l<=0.0031308,l*12.92,1.055*l**(1/2.4)-0.055)
def mA(p):
    w=np.array([p[0],p[1],1-p[0]-p[1]]); L=IN@w; return np.clip(gx(L)[:,None]+p[2]*(IN-L[:,None]),0,255)
def mC(p):
    w=np.array([p[0],p[1],1-p[0]-p[1]]); x=gx(IN); L=x@w; return np.clip(L[:,None]+p[2]*(x-L[:,None]),0,255)
def mE(p): # saturate in linear light, then per-channel curve
    w=np.array([p[0],p[1],1-p[0]-p[1]]); x=lin(IN); L=x@w; y=L[:,None]+p[2]*(x-L[:,None]); return np.clip(gx(srgb(y)),0,255)
def mF(p): # curve on lum in linear-light domain? lum from linear, chroma in srgb
    w=np.array([p[0],p[1],1-p[0]-p[1]]); L=srgb(lin(IN)@w); return np.clip(gx(L)[:,None]+p[2]*(IN-L[:,None]),0,255)
for name,m in [('A lumcurve+chroma',mA),('C curve then sat',mC),('E linsat then curve',mE),('F linlum',mF)]:
    f=lambda p:np.mean((m(p)-OUT)**2)
    best=min((minimize(f,x0,method='Nelder-Mead',options={'maxiter':4000}) for x0 in [[.21,.72,1],[.3,.59,1.5],[.21,.72,2]]),key=lambda r:r.fun)
    e=m(best.x)-OUT
    print(name,np.round(best.x,3),'rms',round(np.sqrt(best.fun),2),'max',round(np.abs(e).max(),1))
    worst=np.argsort(-np.abs(e).max(1))[:4]
    for i in worst: print('   ',IN[i].astype(int),OUT[i].astype(int),np.round(m(best.x)[i]).astype(int))
print('---- ratio analysis (w=0.2126,.7152,.0722)')
w=np.array([.2126,.7152,.0722])
for i in range(len(IN)):
    L=IN[i]@w; ch=IN[i]-L; o=OUT[i]; 
    # recover output lum with same weights and chroma
    Lo=o@w; cho=o-Lo
    nz=np.abs(ch)>20
    if not nz.any(): print(IN[i].astype(int),'gray L',round(L),'Lo',round(Lo,1),'g(L)',round(float(gx(L)),1)); continue
    print(IN[i].astype(int),'L',round(L),'Lo',round(Lo,1),'g(L)',round(float(gx(L)),1),'ratio',np.round(cho[nz]/ch[nz],3), 'clip' if (o<=1).any() or (o>=254).any() else '')
