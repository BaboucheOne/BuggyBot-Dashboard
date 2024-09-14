from fastapi import FastAPI
from starlette.responses import JSONResponse

from src.api.log.exception.bad_field_exception import BadFieldException

app = FastAPI()


@app.exception_handler(BadFieldException)
async def bad_field_exception_handler(request, exc: BadFieldException):
    return JSONResponse(
        status_code=422,
        content={"detail": str(exc)},
    )
