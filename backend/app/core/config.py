from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List
import os


class Settings(BaseSettings):
    api_prefix: str = "/api"
    cors_origins: str = "http://localhost:3000,http://127.0.0.1:3000,http://localhost:3001,http://localhost:3002,http://localhost:3003,http://localhost:3004,http://localhost:3005"
    database_url: str = "postgresql+psycopg://career:career@localhost:5432/career_compass"
    redis_url: str = "redis://localhost:6379/0"
    embeddings_model: str = "text-embedding-3-large"
    openai_api_key: str | None = None
    rapidapi_key: str | None = None
    adzuna_app_id: str | None = None
    adzuna_app_key: str | None = None
    jooble_api_key: str | None = None
    github_token: str | None = None
    bls_api_key: str | None = None
    onet_api_key: str | None = None
    vector_dim: int = 1536
    ingest_interval_minutes: int = 60

    @property
    def get_cors_origins(self) -> List[str]:
        return [origin.strip() for origin in self.cors_origins.split(',')]

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
