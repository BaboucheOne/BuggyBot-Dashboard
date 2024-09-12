import uvicorn
from fastapi import FastAPI, Depends
from starlette.middleware.cors import CORSMiddleware

from api.auth.auth_resource import router as auth_router
from api.log.log_socket import router as log_socket_router
from api.log.log_resource import router as log_resource_router
from api.health.health_resource import router as health_resource_router
from middleware.auth.auth_middleware import authenticate_token, authenticate_websocket


def launch():
    app = setup_app()

    uvicorn.run(app, host="127.0.0.1", port=8080)


def setup_app() -> FastAPI:
    app = FastAPI()

    app.add_middleware(
        CORSMiddleware,
        allow_credentials=True,
        allow_origins=["*"],
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(auth_router)
    app.include_router(log_socket_router, dependencies=[Depends(authenticate_websocket)])
    app.include_router(log_resource_router, dependencies=[Depends(authenticate_token)])
    app.include_router(health_resource_router)

    return app
