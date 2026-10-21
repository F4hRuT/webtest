from lib import *
import sys
mode=sys.argv[1]; DS=[float(x) for x in sys.argv[2].split(',')]; hh=float(sys.argv[3]) if len(sys.argv)>3 else 1/3
wopen('&icons=0')
for d in DS:
    r=[0,791+d,402,hh,255,255,255] if mode=='top' else [0,853+d,402,hh,255,255,255]
    a,_=wshot({'bg':[0,0,0],'rects':[r],'tab':3,'wait':1500},S+'/lnw.png',0.4); a=a[:,:,1].astype(int)
    c=a[2118:2118+186,810]
    print(mode,'d=%6.2f'%d,' '.join('%3d'%v for v in (c[:12] if mode=='top' else c[-12:])),' mean=%.2f'%c.mean())
