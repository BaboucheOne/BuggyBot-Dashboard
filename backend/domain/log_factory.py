import json

from domain.constant import LogKeys
from domain.log import Log
from domain.exception.log_version_not_supported_exception import (
    LogVersionNotSupportedException,
)
from domain.exception.wrong_log_format_exception import WrongLogFormatException


class LogFactory:
    def __init__(self):
        pass

    def create(self, entry: str) -> Log:
        try:
            time_code, _, level, message = entry.split(" - ")
            message_data = json.loads(message)

            if message_data[LogKeys.VERSION] == 2:
                exception = (
                    message_data[LogKeys.EXCEPTION]
                    if LogKeys.EXCEPTION in message_data
                    else None
                )
                return Log(
                    time_code=time_code,
                    level=level,
                    version=message_data[LogKeys.VERSION],
                    method=message_data[LogKeys.METHOD],
                    message=message_data[LogKeys.MESSAGE],
                    exception=exception,
                )
            raise LogVersionNotSupportedException(message_data[LogKeys.VERSION])
        except ValueError:
            raise WrongLogFormatException()
