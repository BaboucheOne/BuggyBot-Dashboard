import os

import app_launcher
from config.constant import ConfigurationFilename
from config.environment.dotenv_configuration import DotEnvConfiguration
from config.service_locator import ServiceLocator
from domain.file_watcher import FileWatcher
from domain.log_file_modified_handler import LogFileModifiedHandler
from domain.log_queue import LogQueue
from api.log.log_connection_manager import LogsConnectionManager

if __name__ == "__main__":
    log_queue = LogQueue()
    dot_env_configuration = DotEnvConfiguration()
    dot_env_configuration.from_file(ConfigurationFilename.DEVELOPMENT)

    ServiceLocator.register_dependency(LogsConnectionManager, LogsConnectionManager())
    ServiceLocator.register_dependency(LogQueue, log_queue)
    ServiceLocator.register_dependency(
        DotEnvConfiguration,
        dot_env_configuration,
    )

    if not os.path.isfile(dot_env_configuration.log_file_path):
        print(f"File {dot_env_configuration.log_file_path} does not exists. Exiting...")
        exit(-1)

    log_file_modified_handler = LogFileModifiedHandler(
        dot_env_configuration.log_file_path, log_queue
    )
    file_watcher = FileWatcher(log_file_modified_handler)
    file_watcher.start()

    app_launcher.launch()
