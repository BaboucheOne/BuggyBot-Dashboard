from typing import Optional
from dataclasses import dataclass


@dataclass
class Log:
    time_code: str
    level: str
    version: int
    method: str
    message: str
    exception: Optional[str]
