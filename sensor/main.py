#!/usr/bin/env python3
import asyncio
import time

from pysnmp.hlapi.v3arch.asyncio import *
import RPi.GPIO as GPIO


async def send_leak_trap():
    snmpEngine = SnmpEngine()
    errorIndication, errorStatus, errorIndex, varBinds = await send_notification(
        snmpEngine,
        CommunityData("public", mpModel=1),
        await UdpTransportTarget.create(("YOUR_SNMP_SERVER", 162)),
        ContextData(),
        "trap",
        NotificationType(ObjectIdentity("1.3.6.1.6.3.1.1.5.2"))
        .load_mibs("SNMPv2-MIB")
        .add_varbinds(
            # 必要に応じてメッセージを追加する
            ("1.3.6.1.2.1.1.1.0", OctetString("my system")),
        ),
    )

    if errorIndication:
        print(errorIndication)

    snmpEngine.close_dispatcher()


if __name__ == '__main__':
    GPIO.setmode(GPIO.BOARD)

    GPIO.setup(36, GPIO.OUT)
    GPIO.setup(38, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
    GPIO.output(36, GPIO.HIGH)

    while True:
        if GPIO.input(38):
            print("water detected!!")
            asyncio.run(send_leak_trap())
        time.sleep(1)
