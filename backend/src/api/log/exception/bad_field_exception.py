class BadFieldException(RuntimeError):

    MESSAGE: str = "Field %s, %s"

    def __init__(self, field_name: str, reason: str):
        super().__init__(self.MESSAGE % (field_name, reason))
