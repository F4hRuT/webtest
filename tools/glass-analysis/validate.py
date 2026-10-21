import sys
exec(open('/private/tmp/claude-501/-Users-artem-fahrutdinov-Desktop-Projects-webtest/a2fd9e5b-0c4e-42c1-804d-5d5b273638f9/scratchpad/model.py').read())
sys.path.insert(0,S); from lib import load, save
name=sys.argv[1]
cont=load(S+f'/{name}.png').astype(float); ios=load(S+f'/{name}_ios.png').astype(float)
G,inside=glass(cont)
# measured G from ios via per-pixel A,K (tab1)
u0=w['u0'].astype(float); u1=w['u255'].astype(float)
K=(u1-u0)/(gl[-1]-gl[0]); A=u0-K*gl[0]
Gm=np.full_like(ios,np.nan)
Gm[2280:2622]=(ios[2280:2622]-A)/np.where(np.abs(K)>0.5,K,np.nan)
# capsule region: tab1 capsule ~ x 330..622, y 2386..2546 ; exclude from interior stats
caps=np.zeros_like(mask); caps[2380:2552,325:628]=True
for lo,hi,lab in [(3,9,'rim 1-3pt'),(9,30,'3-10pt'),(30,999,'>10pt')]:
    m=mask&(inside>=lo)&(inside<hi)&~caps
    e=(G-Gm)[m]; e=e[np.isfinite(e)]
    print(f'{lab:10s} n={len(e)//3:6d} mean {e.mean():+.2f} rms {np.sqrt((e**2).mean()):.2f} p95 {np.percentile(np.abs(e),95):.1f} max {np.abs(e).max():.1f}')
diff=np.where(mask[:,:,None],np.nan_to_num(G-Gm)*4+128,128)
save(diff[2280:2622],S+f'/{name}_diff.png')
sim=ios.copy(); sim[mask]=np.clip(A[mask[2280:2622]] if False else 0,0,0) if False else sim[mask]
