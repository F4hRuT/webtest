"""Bounded lossless screenshots of the already authorized foreground screen."""
import argparse,asyncio,json,time,re
from pathlib import Path
from pymobiledevice3.remote.userspace_tunnel import UserspaceRsdTunnel
from pymobiledevice3.services.dvt.instruments.dvt_provider import DvtProvider
from pymobiledevice3.services.dvt.instruments.screenshot import Screenshot

async def run(a):
 a.output.mkdir(parents=True,exist_ok=True)
 tunnel=UserspaceRsdTunnel(serial=a.udid,autopair=False,remotepairing_fallback=False)
 rows=[]
 try:
  rsd=await tunnel.aopen()
  async with DvtProvider(rsd) as dvt,Screenshot(dvt) as shot:
   print('PNG capture ready',flush=True)
   for i in range(a.count):
    begin=time.monotonic_ns();data=await shot.get_screenshot();end=time.monotonic_ns()
    name=f'{a.label}-{i:02d}.png';(a.output/name).write_bytes(data)
    rows.append({'file':name,'begin_monotonic_ns':begin,'end_monotonic_ns':end,'bytes':len(data)})
    await asyncio.sleep(a.interval)
 finally:
  await tunnel.aclose()
 (a.output/(a.label+'.json')).write_text(json.dumps(rows,indent=2))
 print(json.dumps({'count':len(rows),'elapsed_s':(rows[-1]['end_monotonic_ns']-rows[0]['begin_monotonic_ns'])/1e9}),flush=True)

p=argparse.ArgumentParser(description=__doc__);p.add_argument('--udid',required=True);p.add_argument('--output',type=Path,required=True);p.add_argument('--label',required=True);p.add_argument('--count',type=int,default=12);p.add_argument('--interval',type=float,default=.7);a=p.parse_args()
if not re.fullmatch(r'[A-Za-z0-9_-]{1,60}',a.label):p.error('Use a short filename label')
if not 1<=a.count<=20 or not .1<=a.interval<=2:p.error('Use 1–20 captures, interval .1–2 seconds')
asyncio.run(run(a))
