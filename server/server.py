#!/usr/bin/env python3.5

import asyncio
import websockets
import logging
import random

logger = logging.getLogger('websockets')
logger.setLevel(logging.DEBUG)
logger.addHandler(logging.StreamHandler())

async def status(websocket, path):
    clientID = await websocket.recv()
    print("Client {} > CONNECT".format(clientID))

    while True:
        statusMessage = "{ \"status\": \"idle\", \"temperature\": 25.%d }" % random.randint(0,9)
        await websocket.send(statusMessage)
        print("Server > {}".format(statusMessage))
        await asyncio.sleep(1)

start_server = websockets.serve(status, 'localhost', 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
