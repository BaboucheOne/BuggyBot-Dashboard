import os
from collections import deque
from typing import List

from fastapi import APIRouter, Depends

from src.api.log.exception.bad_field_exception import BadFieldException
from src.config.environment.dotenv_configuration import DotEnvConfiguration
from src.config.service_locator import ServiceLocator
from src.domain.exception.log_version_not_supported_exception import (
    LogVersionNotSupportedException,
)
from src.domain.exception.wrong_log_format_exception import WrongLogFormatException
from src.domain.log import Log
from src.domain.log_factory import LogFactory

router = APIRouter()


@router.get("/log/{amount}", response_model=List[Log])
async def get_log(
    amount: int,
    configuration: DotEnvConfiguration = Depends(
        lambda: ServiceLocator.get_dependency(DotEnvConfiguration)
    ),
):

    if amount <= 0:
        raise BadFieldException(amount.__name__, "amount must be greater than zero.")

    log_factory = LogFactory()
    logs: List[Log] = []

    log_file_abspath = os.path.abspath(configuration.log_file_path)
    with open(log_file_abspath, "r", encoding="utf-8") as f:
        lines = deque(f, maxlen=amount)
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
