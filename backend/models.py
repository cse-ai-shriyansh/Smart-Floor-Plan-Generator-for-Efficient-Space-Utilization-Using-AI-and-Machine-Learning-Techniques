"""
Pydantic models for request/response validation
"""
from pydantic import BaseModel, Field, validator
from typing import Optional


class PlotDimensions(BaseModel):
    """Dimensions of the plot"""
    length: float = Field(..., gt=0, description="Plot length in meters")
    width: float = Field(..., gt=0, description="Plot width in meters")


class ParkingConfig(BaseModel):
    """Parking configuration"""
    enabled: bool
    length: Optional[float] = Field(None, gt=0)
    width: Optional[float] = Field(None, gt=0)
    depth: Optional[float] = Field(None, gt=0)

    @validator('length', 'width', 'depth', pre=True, always=True)
    def validate_parking_dimensions(cls, v, values):
        """Skip validation if parking is disabled"""
        if 'enabled' in values and not values['enabled']:
            return v
        if v is None:
            raise ValueError("Parking dimensions required when parking is enabled")
        return v


class PorchConfig(BaseModel):
    """Porch configuration"""
    enabled: bool
    count: Optional[int] = Field(None, gt=0)

    @validator('count', pre=True, always=True)
    def validate_porch_count(cls, v, values):
        """Skip validation if porch is disabled"""
        if 'enabled' in values and not values['enabled']:
            return v
        if v is None:
            raise ValueError("Porch count required when porch is enabled")
        return v


class GeneratePlanRequest(BaseModel):
    """Request for floor plan generation"""
    plotDimensions: PlotDimensions
    depth: float = Field(..., gt=0, description="Building depth in meters")
    width: float = Field(..., gt=0, description="Building width in meters")
    bedrooms: int = Field(..., gt=0, description="Number of bedrooms")
    livingRooms: int = Field(..., gt=0, description="Number of living rooms")
    kitchens: int = Field(..., gt=0, description="Number of kitchens")
    toilets: int = Field(..., gt=0, description="Number of toilets")
    parking: ParkingConfig
    porch: PorchConfig

    class Config:
        schema_extra = {
            "example": {
                "plotDimensions": {
                    "length": 50,
                    "width": 40
                },
                "depth": 30,
                "width": 25,
                "bedrooms": 3,
                "livingRooms": 2,
                "kitchens": 1,
                "toilets": 2,
                "parking": {
                    "enabled": True,
                    "length": 6,
                    "width": 3,
                    "depth": 5
                },
                "porch": {
                    "enabled": True,
                    "count": 1
                }
            }
        }


class GeneratePlanResponse(BaseModel):
    """Response for floor plan generation"""
    success: bool
    imageUrl: Optional[str] = None
    error: Optional[str] = None

    class Config:
        schema_extra = {
            "example": {
                "success": True,
                "imageUrl": "https://storage.example.com/generated-plan.png"
            }
        }


class ColabAPIResponse(BaseModel):
    """Response from Colab API"""
    image_url: str
