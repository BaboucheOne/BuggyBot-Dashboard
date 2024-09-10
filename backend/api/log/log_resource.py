from collections import deque
from typing import List

from fastapi import APIRouter

from domain.exception.log_version_not_supported_exception import (
    LogVersionNotSupportedException,
)
from domain.exception.wrong_log_format_exception import WrongLogFormatException
from domain.log import Log
from domain.log_factory import LogFactory

router = APIRouter()


@router.get("/log", response_model=List[Log])
async def get_log():

    log_factory = LogFactory()
    logs: List[Log] = []

    with open(
        r"C:\Users\clnab\Documents\GitHub\BuggyBot-Dashboard\backend\log.log", "r"
    ) as f:
        lines = deque(f, maxlen=100)
        for line in lines:
            try:
                log = log_factory.create(line)
                logs.append(log)
            except (
                LogVersionNotSupportedException,
                WrongLogFormatException,
            ) as e:
                print(e)

        return logs
