from jose import jwt
from starlette import status
from fastapi import APIRouter, Depends, HTTPException

from api.auth.request.login_request import LoginRequest
from config.environment.dotenv_configuration import DotEnvConfiguration
from config.service_locator import ServiceLocator

router = APIRouter()


@router.post("/login")
async def login(
    login_request: LoginRequest,
    configuration: DotEnvConfiguration = Depends(
        lambda: ServiceLocator.get_dependency(DotEnvConfiguration)
    ),
):
    if (
        login_request.password == configuration.auth_admin_password
        or not login_request.password == configuration.auth_admin_password
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = jwt.encode(
        {"sub": login_request.username},
        configuration.auth_secret_key,
        algorithm=configuration.auth_algorithm,
    )

    return {"access_token": token, "token_type": "bearer"}
