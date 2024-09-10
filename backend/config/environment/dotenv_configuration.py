import os

from dotenv import load_dotenv, find_dotenv

from config.constant import DotenvConfigurationKey
from config.environment.exception.environment_variable_type_exception import (
    EnvironmentVariableTypeException,
)
from config.environment.exception.missing_environment_variable_exception import (
    MissingEnvironmentVariableException,
)


class DotEnvConfiguration:
    def __init__(self):
        pass

    def from_file(self, filename: str):
        dotenv_path = find_dotenv(filename=filename)
        load_dotenv(dotenv_path=dotenv_path)

    def __get_variable(self, environment_variable_key: str):
        try:
            return os.getenv(environment_variable_key)
        except KeyError:
            raise MissingEnvironmentVariableException(environment_variable_key)

    def __get_string(self, environment_variable_key: str):
        try:
            return str(self.__get_variable(environment_variable_key))
        except (ValueError, TypeError):
            raise EnvironmentVariableTypeException(environment_variable_key, str)

    def __get_int(self, environment_variable_key: str):
        try:
            return int(self.__get_variable(environment_variable_key))
        except (ValueError, TypeError):
            raise EnvironmentVariableTypeException(environment_variable_key, int)

    @property
    def server_address(self) -> str:
        return self.__get_string(DotenvConfigurationKey.SERVER_ADDRESS)

    @property
    def server_port(self) -> int:
        return self.__get_int(DotenvConfigurationKey.SERVER_PORT)

    @property
    def log_file_path(self) -> str:
        return self.__get_string(DotenvConfigurationKey.LOG_FILE_PATH)
