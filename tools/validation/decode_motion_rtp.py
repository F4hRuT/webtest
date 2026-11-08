#!/usr/bin/env python3
"""Extract original HEVC AUs plus RTP/host times from ios_motion_capture.py.

Writes Annex-B HEVC and a frame-index sidecar; the bitstream alone has no
container timestamps. Do not treat a player's assumed frame rate as measured.
Packet gaps invalidate an AU and dependent frames until the next IRAP.
"""
import argparse
import base64
import json
from pathlib import Path
import struct

from pymobiledevice3.remote.core_device.screen_stream import depacketize_hevc

MAGIC = b"GLMRTP1\n"
HEADER = struct.Struct(">IQI")
START = b"\0\0\0\1"


def parameters(codec):
    hvcc = base64.b64decode(codec["description"])
    result, pos = [], 23
    for _ in range(hvcc[22]):
        count = int.from_bytes(hvcc[pos + 1:pos + 3], "big")
        pos += 3
        for _ in range(count):
            size = int.from_bytes(hvcc[pos:pos + 2], "big")
            pos += 2
            result.append(hvcc[pos:pos + size])
            pos += size
    return result


def decode(source, codec, output):
    if codec is None:
        codec_data = json.loads(source.with_suffix(".json").read_text())["codec"]
    else:
        codec_data = json.loads(codec.read_text())
    frames, stats = [], {"packet_gaps": 0, "dropped_aus": 0, "skipped_until_key": 0}
    fu, au = bytearray(), []
    previous_seq = previous_session = None
    bad, waiting_key = False, True
    current_ts = None
    with source.open("rb") as inp, output.open("wb") as out:
        if inp.read(len(MAGIC)) != MAGIC:
            raise ValueError("Unknown recording format")
        for nal in parameters(codec_data):
            out.write(START + nal)
        while header := inp.read(HEADER.size):
            if len(header) != HEADER.size:
                raise ValueError("Truncated packet header")
            generation, host_ns, size = HEADER.unpack(header)
            data = inp.read(size)
            if len(data) != size:
                raise ValueError("Truncated RTP packet")
            if len(data) < 12:
                continue
            seq = int.from_bytes(data[2:4], "big")
            timestamp = int.from_bytes(data[4:8], "big")
            ssrc = int.from_bytes(data[8:12], "big")
            session = (generation, ssrc)
            if session != previous_session:
                fu.clear()
                au.clear()
                previous_seq = None
                current_ts = None
                bad, waiting_key = False, True
            if previous_seq is not None and ((seq - previous_seq) & 0xFFFF) != 1:
                stats["packet_gaps"] += 1
                fu.clear()
                bad = True
            if current_ts is not None and current_ts != timestamp and au:
                stats["dropped_aus"] += 1
                au.clear()
                fu.clear()
                bad, waiting_key = False, True
            previous_seq, previous_session, current_ts = seq, session, timestamp
            offset = 12 + (data[0] & 0x0F) * 4
            if data[0] & 0x10:
                offset += 4 + int.from_bytes(data[offset + 2:offset + 4], "big") * 4
            end = len(data) - (data[-1] if data[0] & 0x20 else 0)
            nals = []
            depacketize_hevc(data[offset:end], fu, nals)
            au.extend(nals)
            if not data[1] & 0x80:
                continue
            key = any(((nal[0] >> 1) & 0x3F) in (19, 20, 21) for nal in au if nal)
            has_picture = any(((nal[0] >> 1) & 0x3F) < 32 for nal in au if nal)
            if bad:
                stats["dropped_aus"] += 1
                waiting_key = True
            elif has_picture and (key or not waiting_key):
                waiting_key = False
                for nal in au:
                    out.write(START + nal)
                frames.append({"frame": len(frames), "generation": generation,
                               "ssrc": ssrc, "rtp_timestamp": timestamp,
                               "host_monotonic_ns": host_ns, "key": key})
            elif has_picture:
                stats["skipped_until_key"] += 1
            au.clear()
            bad = False
            current_ts = None
    meta = {"clock_rate_candidate_hz": 24000,
            "clock_note": "Candidate from transport implementation; validate against received intervals.",
            "stats": stats, "frames": frames}
    output.with_suffix(".frames.json").write_text(json.dumps(meta, indent=2))
    print(json.dumps({"frames": len(frames), **stats, "output": str(output)}))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path)
    parser.add_argument("--codec", type=Path, help="Legacy external codec JSON; newer captures embed it")
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()
    decode(args.source, args.codec, args.output)


if __name__ == "__main__":
    main()
