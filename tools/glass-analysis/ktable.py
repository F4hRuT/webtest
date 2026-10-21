from lib import *
k=np.load(S+'/kmaps.npz'); Kl,Kc,t,th,ins=k['Kl'],k['Kc'],k['t'],k['th'],k['inside']
caps=np.zeros_like(ins); caps[100:272,320:632]=True   # tab1 capsule box (crop coords)
NT,NA=25,13
TL=np.ones((NT,NA)); TC=np.ones((NT,NA)); CNT=np.zeros((NT,NA),int)
for i in range(NT):
    for j in range(NA):
        a0=j*7.5-3.75; a1=j*7.5+3.75
        m=ins&~caps&(t>=i)&(t<i+1)&(th>=a0)&(th<a1)
        CNT[i,j]=m.sum()
        if m.sum()>=3: TL[i,j]=np.median(Kl[m]); TC[i,j]=np.median(Kc[m])
        else: TL[i,j]=np.nan; TC[i,j]=np.nan
# fill gaps by nearest along angle then t
for T in (TL,TC):
    for i in range(NT):
        r=T[i]; ok=~np.isnan(r)
        if ok.any(): T[i]=np.interp(np.arange(NA),np.where(ok)[0],r[ok])
        else: T[i]=T[i-1]
np.savez(S+'/ktable.npz',TL=TL,TC=TC)
np.set_printoptions(linewidth=200)
print('Kl rows t=0..12, angles 0..90 step 7.5'); print(np.round(TL[:13],3))
print('Kc'); print(np.round(TC[:13],3))
print('Kl t 13..24 mean',np.round(TL[13:].mean(1),3)); print('Kc t13..24 mean',np.round(TC[13:].mean(1),3))
print('counts row0',CNT[0]); print('counts row5',CNT[5])
