from queue import Queue

from domain.log import Log


class LogQueue:
    def __init__(self):
        self.__queue = Queue()

    def is_empty(self) -> bool:
        return self.__queue.empty()

    def get_log(self) -> Log:
        return self.__queue.get_nowait()

    def add_log(self, message: Log):
        self.__queue.put_nowait(message)
