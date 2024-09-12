from fastapi import APIRouter, Depends, HTTPException, Response
from jose import jwt
from starlette import status

from api.auth.request.login_request import LoginRequest
from api.utility.auth_utility import AuthUtility
from config.environment.dotenv_configuration import DotEnvConfiguration
from config.service_locator import ServiceLocator

router = APIRouter()


@router.post("/login")
async def login(
    login_request: LoginRequest,
    response: Response,
    configuration: DotEnvConfiguration = Depends(
        lambda: ServiceLocator.get_dependency(DotEnvConfiguration)
    ),
):
    if AuthUtility.verify_password(
        login_request.password, configuration.auth_admin_password
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

    response.set_cookie(
        key="access_token", value=token, httponly=True, secure=True, samesite="lax"
    )

    return {"message": "Login successful"}
