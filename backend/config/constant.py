class ConfigurationFilename:
    DEVELOPMENT: str = ".env.dev"


class DotenvConfigurationKey:
    SERVER_ADDRESS: str = "SERVER_ADDRESS"
    SERVER_PORT: str = "SERVER_PORT"
    LOG_FILE_PATH: str = "LOG_FILE_PATH"
    AUTH_SECRET_KEY: str = "AUTH_SECRET_KEY"
    AUTH_ALGORITHM: str = "AUTH_ALGORITHM"
    AUTH_ADMIN_PASSWORD: str = "AUTH_ADMIN_PASSWORD"
