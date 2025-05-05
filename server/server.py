#!/usr/bin/env python
# -*- coding: utf-8 -*-

import asyncio
import logging

from bacpypes3.debugging import ModuleLogger
from bacpypes3.argparse import SimpleArgumentParser
from bacpypes3.object import AnalogInputObject, BinaryInputObject, BinaryPV
from bacpypes3.ipv4.app import Application

logging.basicConfig(level=logging.DEBUG)

# some debugging
_debug = 1
_log = ModuleLogger(globals())


async def main() -> None:
    try:
        app = None
        args = SimpleArgumentParser().parse_args()
        if _debug:
            _log.debug("args: %r", args)

        # build an application
        app = Application.from_args(args)
        if _debug:
            _log.debug("app: %r", app)

        # 必要に応じてObjectを追記
        temp_object = AnalogInputObject(
            objectName="Tray #1 temp",
            objectIdentifier=("analogInput", 1),
            presentValue=0.0,  # 初期値
            description="Tray #1 temperature",
            units="degrees-celsius",
        )
        is_leak_object = BinaryInputObject(
            objectName="Rack leak flag",
            objectIdentifier=("binaryInput", 1),
            presentValue=BinaryPV.inactive,
            description="Rack leak flag",
        )
        app.add_object(temp_object)
        app.add_object(is_leak_object)

        # like running forever
        await asyncio.Future()

    finally:
        if app:
            app.close()


if __name__ == "__main__":
    asyncio.run(main())
