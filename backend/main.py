"""
FastAPI backend for floor plan generation
Integrates frontend form data with Google Colab image generator
"""
import logging
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from config import settings
from models import GeneratePlanRequest, GeneratePlanResponse
from services.colab_service import ColabService

# Configure logging
logging.basicConfig(
    level=logging.INFO if settings.DEBUG else logging.WARNING,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# Lifespan context for startup checks
@asynccontextmanager
async def lifespan(app: FastAPI):
    """Handle startup and shutdown events"""
    # Startup
    logger.info("🚀 Starting FastAPI backend")
    try:
        settings.validate()
        logger.info(f"✓ Colab API URL configured: {settings.COLAB_API_URL}")
    except ValueError as e:
        logger.error(f"✗ Configuration error: {e}")
        raise
    
    yield
    
    # Shutdown
    logger.info("🛑 Shutting down FastAPI backend")


# Create FastAPI app with lifespan
app = FastAPI(
    title="Floor Plan Generator Backend",
    description="Backend API for floor plan generation with Google Colab integration",
    version="1.0.0",
    lifespan=lifespan
)


# Add CORS middleware (allow all origins for development)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "ok",
        "environment": settings.ENVIRONMENT,
        "colab_api_configured": bool(settings.COLAB_API_URL)
    }


@app.post("/generate-plan", response_model=GeneratePlanResponse)
async def generate_plan(request: GeneratePlanRequest) -> GeneratePlanResponse:
    """
    Generate a floor plan based on specifications
    
    Receives form data from frontend, sends to Google Colab API,
    and returns the generated image URL.
    
    Args:
        request: Floor plan specification with all dimensions and room counts
        
    Returns:
        GeneratePlanResponse with success status and image URL or error message
    """
    try:
        logger.info("📋 Received floor plan generation request")
        logger.debug(f"Request data: {request}")
        
        # Send to Colab API
        result = await ColabService.send_to_colab(request)
        
        if not result["success"]:
            logger.warning(f"Colab API returned error: {result.get('error')}")
            raise HTTPException(
                status_code=502,
                detail=result.get("error", "Failed to generate floor plan")
            )
        
        logger.info(f"✓ Successfully generated floor plan: {result['imageUrl']}")
        
        return GeneratePlanResponse(
            success=True,
            imageUrl=result["imageUrl"]
        )
        
    except HTTPException:
        # Re-raise HTTP exceptions
        raise
        
    except Exception as e:
        error_msg = f"Unexpected error: {str(e)}"
        logger.error(error_msg)
        raise HTTPException(
            status_code=500,
            detail="Internal server error while generating floor plan"
        )


# Error handlers
@app.exception_handler(ValueError)
async def value_error_handler(request, exc):
    """Handle validation errors"""
    logger.error(f"Validation error: {str(exc)}")
    return GeneratePlanResponse(
        success=False,
        error=f"Validation error: {str(exc)}"
    )


if __name__ == "__main__":
    import uvicorn
    
    logger.info("Starting server...")
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG,
        log_level="info" if settings.DEBUG else "warning"
    )
