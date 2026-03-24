# Floor Plan Generator Backend

FastAPI backend for floor plan generation with Google Colab integration.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Configure Environment

Copy `.env.example` to `.env` and update with your Colab ngrok URL:

```bash
cp .env.example .env
```

Edit `.env`:
```
COLAB_API_URL=https://your-ngrok-url.ngrok.io
```

### 3. Run Server

```bash
python main.py
```

Server starts at: `http://localhost:8000`

## 📚 API Endpoints

### Health Check
```
GET /health
```

Response:
```json
{
  "status": "ok",
  "environment": "development",
  "colab_api_configured": true
}
```

### Generate Floor Plan
```
POST /generate-plan
Content-Type: application/json
```

**Request Example:**
```json
{
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
    "enabled": true,
    "length": 6,
    "width": 3,
    "depth": 5
  },
  "porch": {
    "enabled": true,
    "count": 1
  }
}
```

**Success Response (200):**
```json
{
  "success": true,
  "imageUrl": "https://storage.example.com/generated-plan.png"
}
```

**Error Response (502/500):**
```json
{
  "detail": "Failed to connect to Colab API"
}
```

## 🏗️ Project Structure

```
backend/
├── main.py                 # FastAPI application
├── models.py              # Pydantic request/response schemas
├── config.py              # Environment configuration
├── services/
│   └── colab_service.py   # Colab API integration
├── requirements.txt       # Python dependencies
├── .env.example          # Example environment variables
└── README.md             # This file
```

## 🔑 Key Features

✓ **Pydantic Validation** - Strict input validation with nested models  
✓ **CORS Enabled** - Works with frontend on different origins  
✓ **Error Handling** - Graceful error responses for all failure scenarios  
✓ **Logging** - Comprehensive request/response logging  
✓ **Timeout Protection** - 10-second timeout for Colab requests  
✓ **Field Mapping** - Converts `image_url` from Colab to `imageUrl` for frontend  
✓ **Async Endpoints** - Built for performance with async/await  

## 📋 Validation Rules

- All numeric dimensions must be > 0
- `parking.enabled = false` → dimensions ignored
- `porch.enabled = false` → count ignored
- Valid bedroom, living room, kitchen, toilet counts required

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `COLAB_API_URL` | Ngrok URL for Google Colab API | Yes |
| `REQUEST_TIMEOUT` | Timeout in seconds (default: 10) | No |
| `ENVIRONMENT` | deployment (default: development) | No |
| `DEBUG` | Enable debug logging (default: true) | No |

## 🧪 Testing with cURL

```bash
curl -X POST http://localhost:8000/generate-plan \
  -H "Content-Type: application/json" \
  -d '{
    "plotDimensions": {"length": 50, "width": 40},
    "depth": 30,
    "width": 25,
    "bedrooms": 3,
    "livingRooms": 2,
    "kitchens": 1,
    "toilets": 2,
    "parking": {"enabled": true, "length": 6, "width": 3, "depth": 5},
    "porch": {"enabled": true, "count": 1}
  }'
```

## 📖 Interactive Docs

Once running, visit:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## 🛠️ Development Commands

### Run with auto-reload
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Run in production
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

## 🚨 Troubleshooting

**"COLAB_API_URL not set"**
- Create `.env` file in backend root
- Add your Colab ngrok URL: `COLAB_API_URL=https://...`

**"Connection refused" to Colab**
- Verify Colab endpoint is running
- Check ngrok tunnel is active
- Confirm URL in `.env` is correct

**CORS errors from frontend**
- CORS is already enabled for all origins
- Check frontend is using correct backend URL

## 📝 License

Internal use only
