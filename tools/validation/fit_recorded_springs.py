#!/usr/bin/env python3
"""Fit a candidate center spring to a Glass motion fixture, not an Apple parameter dump.

Usage: python fit_recorded_springs.py native-motion-samples.json
Requires numpy and scipy. Output errors are normalized center-position errors;
these do not validate visible glass, highlights, or 120 Hz device smoothness.
"""
import argparse
import json
from pathlib import Path
import numpy as np
from scipy.optimize import least_squares


def spring_step(t, frequency, damping):
    t = np.maximum(t, 0)
    q = np.sqrt(1 - damping * damping)
    return 1 - np.exp(-damping * frequency * t) * (
        np.cos(frequency * q * t) + damping / q * np.sin(frequency * q * t)
    )


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('fixture', type=Path)
    args = parser.parse_args()
    fixture = json.loads(args.fixture.read_text())
    sequences = []
    for sequence in fixture['sequences']:
        columns = sequence['columns']
        values = np.asarray(sequence['samples'], dtype=float)
        time = values[:, columns.index('display_t')]
        position = values[:, columns.index('lens_pos_x')]
        start = float(np.median(position[time < 0]))
        end = float(np.median(position[time > 1.2]))
        if abs(end - start) < 1:
            continue
        mask = time < 1.2
        sequences.append((time[mask], (position[mask] - start) / (end - start)))
    if not sequences:
        raise SystemExit('No nonzero center transitions in fixture')

    def residual(parameters):
        frequency, damping, *delays = parameters
        return np.concatenate([
            spring_step(time - delay, frequency, damping) - position
            for (time, position), delay in zip(sequences, delays)
        ])

    n = len(sequences)
    result = least_squares(
        residual, [16, .85] + [.01] * n,
        bounds=([5, .1] + [-.05] * n, [60, .99999] + [.2] * n),
    )
    print(json.dumps({
        'status': 'candidate fit; not Apple API parameters or pixel validation',
        'natural_frequency_rad_s': result.x[0],
        'damping_ratio': result.x[1],
        'per_sequence_delay_s': result.x[2:].tolist(),
        'normalized_position_rmse': float(np.sqrt(np.mean(result.fun ** 2))),
        'samples': len(result.fun),
    }, indent=2))


if __name__ == '__main__':
    main()
