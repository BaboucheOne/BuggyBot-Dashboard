from fastapi import APIRouter
from fastapi.responses import Response
from starlette import status

router = APIRouter()


@router.get("/health")
async def get_health():
    return Response(status_code=status.HTTP_200_OK)
