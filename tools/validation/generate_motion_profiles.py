#!/usr/bin/env python3
"""Rebuild the normalized deformation profiles from native layer telemetry.

Prints a JS literal for SHAPE, not a new application file. Requires numpy.
The per-run delays come from fit_recorded_springs.py; they remove the fixture's
input/commit lag, not add a phone capture delay to the website. The separately
documented physical-device calibration stays explicit in menu.js.
"""
import argparse,json
from pathlib import Path
import numpy as np

def profiles(fixture,delays):
    times=[0,.025,.05,.075,.1,.125,.15,.175,.2,.225,.25,.275,.3,.35,.4,.45,.5,.6,.7,.8,1,1.2]
    result=[]
    if len(fixture['sequences'])!=len(delays):raise ValueError('One delay per sequence is required')
    for sequence,delay in zip(fixture['sequences'],delays):
        a=np.asarray(sequence['samples'],dtype=float)
        col=sequence['columns'];v=lambda name:a[:,col.index(name)]
        t=v('display_t')-delay;direction=np.sign(v('cx_bar')[-1]-v('cx_bar')[0])
        channels=[direction*(v('cx_bar')-v('lens_pos_x'))/v('lens_width'),
                  v('width_bar')/v('lens_width')-1,v('height_bar')/v('lens_height')-1]
        row=[]
        for channel in channels:
            values=np.interp(times,t,channel);values[0]=values[-1]=0
            row.append([z for pair in zip(times,np.round(values,6).tolist()) for z in pair])
        result.append(row)
    return result

if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('fixture',type=Path)
    parser.add_argument('--delays',default='.036043,.008385,.008133')
    args=parser.parse_args()
    print(json.dumps(profiles(json.loads(args.fixture.read_text()),[float(v) for v in args.delays.split(',')]),separators=(',',':')))
