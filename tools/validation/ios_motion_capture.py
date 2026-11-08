#!/usr/bin/env python3
"""Local iPhone viewer plus original video RTP capture and touch timing.

Requires pymobiledevice3==11.50.2. Uses its internal video-receive hook;
revalidate the adapter before upgrading. No re-encoding, audio recording,
app installation or device-setting changes. The viewer sends only actions
explicitly requested by its operator; keep it within the authorized apps.

Run with --udid DEVICE --output TEMP_DIR. Open localhost:8765 using CUA.
Write {"id": UNIQUE, "action": "start", "label": "tap"} to control.json;
write a new id with action "stop" to finish. Captures also stop at --limit.
"""

import argparse
import asyncio
import base64
import contextlib
import importlib.metadata
import json
import logging
from pathlib import Path
import re
import struct
import time

from pymobiledevice3.remote.core_device.screen_stream import (
    ScreenStreamServer, hevc_decoder_configuration_record,
)
from pymobiledevice3.remote.core_device.hid_service import (
    UniversalHIDServiceService, IndigoHIDService,
)
from pymobiledevice3.remote.userspace_tunnel import UserspaceRsdTunnel

MAGIC = b"GLMRTP1\n"
HEADER = struct.Struct(">IQI")  # stream generation, host monotonic ns, packet size


class Recorder:
    def __init__(self, output, limit):
        self.output, self.limit = output, limit
        self.fp = None
        self.meta = None
        self.base = None

    def start(self, label):
        self.stop("next capture")
        if not re.fullmatch(r"[A-Za-z0-9_-]{1,60}", label):
            raise ValueError("label must be a short filename slug")
        self.base = self.output / f"{label}-{time.time_ns()}"
        self.fp = self.base.with_suffix(".rtpbin").open("xb")
        self.fp.write(MAGIC)
        self.meta = {
            "schema": 1,
            "tool": "pymobiledevice3==11.50.2",
            "source": "original iPhone video RTP; no re-encoding",
            "start_unix_ns": time.time_ns(),
            "start_monotonic_ns": time.monotonic_ns(),
            "packets": 0,
            "marker_packets": 0,
            "bytes": 0,
            "touch_events": [],
        }
        print(json.dumps({"recording": str(self.base), "limit_s": self.limit}), flush=True)

    def packet(self, generation, data):
        if self.fp is None:
            return
        now = time.monotonic_ns()
        if (now - self.meta["start_monotonic_ns"]) / 1e9 >= self.limit:
            self.stop("time limit")
            return
        if len(data) < 12 or 64 <= (data[1] & 0x7F) <= 95:
            return
        self.fp.write(HEADER.pack(generation, now, len(data)))
        self.fp.write(data)
        self.meta["packets"] += 1
        self.meta["marker_packets"] += int(bool(data[1] & 0x80))
        self.meta["bytes"] += len(data)

    def event(self, phase, data):
        if self.fp is not None:
            self.meta["touch_events"].append({
                "host_monotonic_ns": time.monotonic_ns(),
                "phase": phase,
                "data": data,
            })

    def stop(self, reason):
        if self.fp is None:
            return
        self.fp.close()
        self.fp = None
        self.meta.update(stop_reason=reason, stop_monotonic_ns=time.monotonic_ns())
        self.base.with_suffix(".json").write_text(json.dumps(self.meta, indent=2))
        print(json.dumps({"stopped": str(self.base), "packets": self.meta["packets"],
                          "markers": self.meta["marker_packets"], "reason": reason}), flush=True)


class VideoTransport:
    def __init__(self, inner, recorder, generation):
        self.inner, self.recorder, self.generation = inner, recorder, generation

    def __getattr__(self, name):
        return getattr(self.inner, name)

    async def recv(self, bufsize=65535):
        data = await self.inner.recv(bufsize)
        self.recorder.packet(self.generation, data)
        return data


class RecordingServer(ScreenStreamServer):
    def __init__(self, rsd, recorder, port):
        super().__init__(rsd, bind="127.0.0.1", http_port=port,
                         audio_default_on=False, compensate=False, motion_idr=False)
        self.recorder = recorder
        self.generation = 0

    async def _ensure_fresh_stream(self, *, force=False):
        result = await super()._ensure_fresh_stream(force=force)
        # Cold HID connection setup can queue both down and up, collapsing
        # an intended press to <1 ms. Open it before accepting test gestures.
        await self.warm_hid()
        return result

    async def warm_hid(self):
        # Do not create another queue worker during the parent's eager boot.
        async with self._hid_lock:
            for attribute, factory in (("_uhs", UniversalHIDServiceService),
                                       ("_indigo", IndigoHIDService)):
                if getattr(self, attribute) is None:
                    service = factory(self._rsd)
                    await service.connect()
                    setattr(self, attribute, service)

    async def _udp_recv_and_depacketize(self, transport):
        self.generation += 1
        return await super()._udp_recv_and_depacketize(
            VideoTransport(transport, self.recorder, self.generation))

    async def _handle_touch(self, body):
        data = json.loads(body)
        self.recorder.event("dispatch_begin", data)
        result = await super()._handle_touch(body)
        self.recorder.event("dispatch_end", {"status": result[0], **data})
        return result


async def commands(server, recorder, control):
    seen = None
    while True:
        try:
            command = json.loads(control.read_text())
            if command.get("id") != seen:
                seen = command.get("id")
                if command.get("action") == "start":
                    parameter_sets = (server._vps_nal, server._sps_nal, server._pps_nal)
                    if not all(parameter_sets):
                        raise RuntimeError("Video codec is not ready; wait for live frames")
                    await server.warm_hid()
                    recorder.start(command["label"])
                    recorder.meta["codec"] = {
                        "codec": server._codec_string,
                        "description": base64.b64encode(
                            hevc_decoder_configuration_record(*parameter_sets)).decode(),
                    }
                    server._request_recovery_idr(reason="motion-capture-start")
                elif command.get("action") == "stop":
                    recorder.stop("operator")
        except FileNotFoundError:
            pass
        except Exception as error:
            print(json.dumps({"control_error": str(error)}), flush=True)
        if recorder.fp is not None:
            elapsed = (time.monotonic_ns() - recorder.meta["start_monotonic_ns"]) / 1e9
            if elapsed >= recorder.limit:
                recorder.stop("time limit")
        await asyncio.sleep(.1)


async def run(args):
    if importlib.metadata.version("pymobiledevice3") != "11.50.2":
        raise RuntimeError("This capture adapter is pinned to pymobiledevice3==11.50.2")
    args.output.mkdir(parents=True, exist_ok=True)
    recorder = Recorder(args.output, args.limit)
    tunnel = UserspaceRsdTunnel(serial=args.udid, autopair=False, remotepairing_fallback=False)
    watcher = None
    try:
        rsd = await tunnel.aopen()
        server = RecordingServer(rsd, recorder, args.port)
        watcher = asyncio.create_task(commands(server, recorder, args.output / "control.json"))
        await server.serve()
    finally:
        if watcher is not None:
            watcher.cancel()
            with contextlib.suppress(asyncio.CancelledError):
                await watcher
        recorder.stop("server shutdown")
        await tunnel.aclose()


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--udid", required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--port", type=int, default=8765)
    parser.add_argument("--limit", type=float, default=60)
    args = parser.parse_args()
    if not 1 <= args.limit <= 120:
        parser.error("--limit must be between 1 and 120 seconds")
    logging.basicConfig(level=logging.INFO, format="%(levelname)s %(name)s: %(message)s")
    asyncio.run(run(args))


if __name__ == "__main__":
    main()
