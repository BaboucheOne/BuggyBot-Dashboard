import os
import threading
from threading import Thread

from watchdog.events import FileSystemEventHandler
from watchdog.observers import Observer


class FileWatcher(Thread):
    def __init__(self, file_handler: FileSystemEventHandler):
        super().__init__(daemon=True)
        self.__observer = Observer()
        self.__observer.schedule(
            file_handler, path=os.path.dirname(file_handler.file_path), recursive=False
        )
        self.__stop_event = threading.Event()

    def run(self) -> None:
        self.__observer.start()

        while not self.__stop_event.is_set():
            pass

        self.__observer.stop()

    def stop(self):
        self.__stop_event.set()
