from fastapi import Depends, HTTPException
from jose import jwt, JWTError
from starlette import status
from fastapi.security import OAuth2PasswordBearer
from starlette.websockets import WebSocket

from config.environment.dotenv_configuration import DotEnvConfiguration
from config.service_locator import ServiceLocator


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def __verify_token(token: str, secret_key: str, algorithm: str) -> bool:
    try:
        jwt.decode(
            token,
            secret_key,
            algorithms=[algorithm],
        )
        return True
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Page not found.",
            headers={"WWW-Authenticate": "Bearer"},
        )


def authenticate_token(
    token: str = Depends(oauth2_scheme),
    configuration: DotEnvConfiguration = Depends(
        lambda: ServiceLocator.get_dependency(DotEnvConfiguration)
    ),
):
    try:
        __verify_token(token, configuration.auth_secret_key, configuration.auth_algorithm)
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Page not found.",
            headers={"WWW-Authenticate": "Bearer"},
        )


async def authenticate_websocket(websocket: WebSocket):
    token = websocket.query_params.get("token")
    configuration: DotEnvConfiguration = ServiceLocator.get_dependency(DotEnvConfiguration)

    if not token or not __verify_token(token, configuration.auth_secret_key, configuration.auth_algorithm):
        await websocket.close(code=4004)
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Page not found.",
            headers={"WWW-Authenticate": "Bearer"},
        )
