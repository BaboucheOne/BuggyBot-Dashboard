import argparse
import os

import app_launcher
from config.constant import ConfigurationFilename
from config.environment.dotenv_configuration import DotEnvConfiguration
from config.service_locator import ServiceLocator
from domain.file_watcher import FileWatcher
from domain.log_file_modified_handler import LogFileModifiedHandler
from domain.log_queue import LogQueue
from api.log.log_connection_manager import LogsConnectionManager


LAUNCH_DEVELOPMENT_CONTEXT_NAME = "dev"
LAUNCH_DOCKER_CONTEXT_NAME = "docker"


def read_arguments() -> argparse.Namespace:

    parser = argparse.ArgumentParser(description="Demarre le backend du dashboard.")

    parser.add_argument(
        "--env",
        type=str,
        nargs="?",
        dest="env",
        choices=[
            LAUNCH_DEVELOPMENT_CONTEXT_NAME,
            LAUNCH_DOCKER_CONTEXT_NAME,
        ],
        default=LAUNCH_DEVELOPMENT_CONTEXT_NAME,
        help=(
            f"Spécifiez si le backend doit fonctionner en mode développement ({LAUNCH_DEVELOPMENT_CONTEXT_NAME}), "
            f"ou docker ({LAUNCH_DOCKER_CONTEXT_NAME}) mode"
        ),
    )

    return parser.parse_args()


def get_dot_env_configuration(args: argparse.Namespace) -> DotEnvConfiguration:
    dot_env_configuration = DotEnvConfiguration()
    if args.env == LAUNCH_DEVELOPMENT_CONTEXT_NAME:
        print("Lancement en mode devellopement")
        dot_env_configuration.from_file(ConfigurationFilename.DEVELOPMENT)
        return dot_env_configuration
    print("Lancement en mode docker")
    return dot_env_configuration


def main():
    arguments = read_arguments()
    log_queue = LogQueue()
    dot_env_configuration = get_dot_env_configuration(arguments)

    ServiceLocator.register_dependency(LogsConnectionManager, LogsConnectionManager())
    ServiceLocator.register_dependency(LogQueue, log_queue)
    ServiceLocator.register_dependency(
        DotEnvConfiguration,
        dot_env_configuration,
    )

    print(dot_env_configuration.log_file_path)

    if not os.path.isfile(dot_env_configuration.log_file_path):
        print(f"File {dot_env_configuration.log_file_path} does not exists. Exiting...")
        exit(-1)

    log_file_modified_handler = LogFileModifiedHandler(
        dot_env_configuration.log_file_path, log_queue
    )
    file_watcher = FileWatcher(log_file_modified_handler)
    file_watcher.start()

    app_launcher.launch()


if __name__ == "__main__":
    main()
