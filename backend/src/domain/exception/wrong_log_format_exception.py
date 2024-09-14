class WrongLogFormatException(RuntimeError):

    MESSAGE: str = "Do not correspond to typical log format."

    def __init__(self):
        super().__init__(self.MESSAGE)
