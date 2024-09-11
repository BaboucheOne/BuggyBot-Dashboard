from typing import List

from watchdog.events import FileSystemEventHandler

from domain.log_factory import LogFactory
from domain.log_queue import LogQueue
from domain.exception.log_version_not_supported_exception import (
    LogVersionNotSupportedException,
)
from domain.exception.wrong_log_format_exception import WrongLogFormatException


class LogFileModifiedHandler(FileSystemEventHandler):

    def __init__(self, file_path: str, log_queue: LogQueue):
        self.__file_path = file_path
        self.__log_queue = log_queue
        self.__last_position = 0

        self.__log_factory = LogFactory()

    @property
    def file_path(self) -> str:
        return self.__file_path

    def on_modified(self, event):
        if event.src_path == self.__file_path:
            log_entries = self.__read_new_log_entries()
            if log_entries:
                for entry in log_entries:
                    try:
                        if len(entry.strip()) > 0:
                            log = self.__log_factory.create(entry)
                            self.__log_queue.add_log(log)
                    except (
                        LogVersionNotSupportedException,
                        WrongLogFormatException,
                    ) as e:
                        print(e)

    def __read_new_log_entries(self) -> List[str] or None:
        new_logs: List[str] = []
        with open(self.file_path, "r") as file:
            file.seek(self.__last_position)
            new_logs = file.readlines()
            self.__last_position = file.tell()

        return new_logs if new_logs else None
