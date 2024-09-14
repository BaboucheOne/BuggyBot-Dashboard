class LogVersionNotSupportedException(RuntimeError):

    MESSAGE: str = "Log version %s is not supported."

    def __init__(self, version: int):
        super().__init__(self.MESSAGE % version)
