"""App configuration loaded from environment variables."""
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    # Supabase Postgres connection string, e.g.
    # postgresql://postgres.<ref>:<password>@aws-0-<region>.pooler.supabase.com:6543/postgres
    database_url: str = "postgresql://user:pass@localhost:5432/postgres"
    cors_origins: list[str] = ["http://localhost:3000"]


settings = Settings()