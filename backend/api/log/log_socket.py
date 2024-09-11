import asyncio
import json
from dataclasses import asdict

from fastapi import APIRouter, Depends, WebSocket
from starlette.websockets import WebSocketDisconnect, WebSocketState

from config.service_locator import ServiceLocator
from domain.log_queue import LogQueue
from api.log.log_connection_manager import LogsConnectionManager

router = APIRouter()


@router.websocket("/log")
async def send_logs(
    websocket: WebSocket,
    manager: LogsConnectionManager = Depends(
        lambda: ServiceLocator.get_dependency(LogsConnectionManager)
    ),
    log_queue: LogQueue = Depends(lambda: ServiceLocator.get_dependency(LogQueue)),
):
    await manager.connect(websocket)

    try:
        while websocket.client_state != WebSocketState.DISCONNECTED:
            while not log_queue.is_empty():
                log = log_queue.get_log()
                json_log = json.dumps(asdict(log))
                print("sending", json_log)
                await manager.send_message(json_log, websocket)
            await asyncio.sleep(0.1)
    except WebSocketDisconnect:
        pass
    finally:
        await manager.disconnect(websocket)
