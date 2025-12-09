import logging
from typing import Any

LOG_FORMAT = "%(asctime)s | %(levelname)-8s | %(name)s:%(lineno)d - %(message)s"


def configure_logging() -> None:
    logging.basicConfig(
        format=LOG_FORMAT,
        level=logging.INFO,
        datefmt="%Y-%m-%d %H:%M:%S"
    )


def get_logger(name: str) -> Any:
    return logging.getLogger(name)
