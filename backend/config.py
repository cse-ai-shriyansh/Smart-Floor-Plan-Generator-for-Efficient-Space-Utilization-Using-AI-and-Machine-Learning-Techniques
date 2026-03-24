"""
Configuration and environment variable management
"""
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


class Settings:
    """Application settings from environment variables"""
    
    COLAB_API_URL: str = os.getenv("COLAB_API_URL", "")
    REQUEST_TIMEOUT: int = int(os.getenv("REQUEST_TIMEOUT", "10"))
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    DEBUG: bool = os.getenv("DEBUG", "true").lower() == "true"
    
    @classmethod
    def validate(cls) -> None:
        """Validate that required environment variables are set"""
        if not cls.COLAB_API_URL:
            raise ValueError(
                "COLAB_API_URL not set in environment variables. "
                "Please set it in .env file"
            )


settings = Settings()
