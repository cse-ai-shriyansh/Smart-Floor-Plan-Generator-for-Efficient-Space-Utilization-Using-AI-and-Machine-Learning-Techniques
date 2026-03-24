"""
Service for communicating with Google Colab API
"""
import requests
import logging
from typing import Dict, Any
from config import settings
from models import GeneratePlanRequest, ColabAPIResponse

logger = logging.getLogger(__name__)


class ColabService:
    """Handles communication with Google Colab API"""
    
    @staticmethod
    async def send_to_colab(request_data: GeneratePlanRequest) -> Dict[str, Any]:
        """
        Send floor plan request to Google Colab API
        
        Args:
            request_data: Validated floor plan request
            
        Returns:
            Dictionary with success status and image URL or error
            
        Raises:
            requests.RequestException: If API call fails
            ValueError: If response is invalid
        """
        try:
            logger.info(f"Sending request to Colab API: {settings.COLAB_API_URL}")
            
            # Convert request to dictionary (preserving exact field names)
            payload = request_data.dict()
            
            logger.debug(f"Payload: {payload}")
            
            # Send POST request to Colab API
            response = requests.post(
                url=f"{settings.COLAB_API_URL}/generate",
                json=payload,
                timeout=settings.REQUEST_TIMEOUT,
                headers={"Content-Type": "application/json"}
            )
            
            # Raise exception for non-2xx status codes
            response.raise_for_status()
            
            # Parse response
            response_json = response.json()
            logger.info(f"Received response from Colab: {response_json}")
            
            # Validate response structure
            colab_response = ColabAPIResponse(**response_json)
            
            return {
                "success": True,
                "imageUrl": colab_response.image_url
            }
            
        except requests.Timeout:
            error_msg = f"Colab API timeout after {settings.REQUEST_TIMEOUT} seconds"
            logger.error(error_msg)
            return {
                "success": False,
                "error": error_msg
            }
            
        except requests.ConnectionError as e:
            error_msg = f"Failed to connect to Colab API: {str(e)}"
            logger.error(error_msg)
            return {
                "success": False,
                "error": error_msg
            }
            
        except requests.HTTPError as e:
            error_msg = f"Colab API error: {response.status_code} - {response.text}"
            logger.error(error_msg)
            return {
                "success": False,
                "error": error_msg
            }
            
        except ValueError as e:
            error_msg = f"Invalid response from Colab API: {str(e)}"
            logger.error(error_msg)
            return {
                "success": False,
                "error": error_msg
            }
            
        except Exception as e:
            error_msg = f"Unexpected error communicating with Colab: {str(e)}"
            logger.error(error_msg)
            return {
                "success": False,
                "error": error_msg
            }
