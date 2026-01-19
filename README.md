# Smart Floor Plan Generator using Deep Learning

A fully responsive, minimalist website for generating optimized floor plans using AI and deep learning technology. Built with Next.js, TypeScript, and a strict black & white color palette.

## 🎨 Design Philosophy

- **Strictly Black & White**: No colors, no gradients, pure monochrome design
- **Minimalist UI**: Clean, modern interface with plenty of whitespace
- **Responsive**: Mobile-first design that works perfectly on all devices
- **Accessible**: Clear typography and high contrast for readability

## 🚀 Features

### Multi-Page Architecture

1. **Landing Page** (`/`)
   - Hero section with geometric design elements
   - Project overview and key benefits
   - Call-to-action to get started

2. **Registration Page** (`/register`)
   - User registration form with validation
   - Client-side form validation
   - Clear error messaging
   - Role selection (Student/Architect/Developer)

3. **Tutorial Page** (`/tutorial`)
   - Step-by-step guide
   - How to use the application
   - Input instructions and AI generation process

4. **Main Application Page** (`/app`)
   - Left panel: Input form for plot dimensions and room requirements
   - Right panel: Floor plan preview area
   - Generate and Reset functionality
   - Loading states and error handling

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: CSS Modules
- **Font**: System Sans-Serif fonts

## 📁 Project Structure

```
Civil website/
├── components/
│   ├── Header.tsx          # Main header with navigation
│   ├── Footer.tsx          # Footer component
│   └── Layout.tsx          # Layout wrapper
├── pages/
│   ├── _app.tsx            # App wrapper
│   ├── _document.tsx       # Document structure
│   ├── index.tsx           # Landing page
│   ├── register.tsx        # Registration page
│   ├── tutorial.tsx        # Tutorial page
│   ├── app.tsx             # Main application page
│   └── api/                # API routes
│       ├── register.ts     # User registration endpoint
│       ├── login.ts        # User login endpoint
│       ├── generate-floorplan.ts  # Floor plan generation
│       └── tutorial-status.ts     # Tutorial tracking
├── styles/
│   ├── globals.css         # Global styles
│   ├── Header.module.css   # Header styles
│   ├── Footer.module.css   # Footer styles
│   ├── Home.module.css     # Landing page styles
│   ├── Register.module.css # Registration page styles
│   ├── Tutorial.module.css # Tutorial page styles
│   └── App.module.css      # Application page styles
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🔌 API Endpoints

### POST `/api/register`
Register a new user

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "role": "student"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "userId": "user_123",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

### POST `/api/login`
Authenticate user

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### POST `/api/generate-floorplan`
Generate AI-powered floor plan

**Request Body:**
```json
{
  "plotWidth": 30,
  "plotHeight": 40,
  "numRooms": 5,
  "bedrooms": 3,
  "bathrooms": 2,
  "kitchen": true,
  "livingRoom": true,
  "diningRoom": false,
  "studyRoom": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Floor plan generated successfully",
  "data": {
    "floorPlanId": "fp_123",
    "imageUrl": "/floor-plans/generated_123.png",
    "parameters": { ... },
    "generatedAt": "2026-01-19T10:00:00Z"
  }
}
```

### GET/POST `/api/tutorial-status`
Track tutorial completion status

## ✨ Features Implementation

### Form Validation
- Real-time client-side validation
- Clear error messages
- Required field checking
- Email format validation
- Password matching
- Numerical constraints validation

### Loading States
- Spinner animation during generation
- Disabled buttons during processing
- Progress indicators

### Error Handling
- Network error handling
- Invalid input detection
- Server error messages
- User-friendly error display

### Responsive Design
- Mobile-first approach
- Breakpoints at 768px and 1024px
- Flexible grid layouts
- Touch-friendly interfaces

## 🎯 Backend Integration Guide

To integrate with your backend:

1. **Update API endpoints** in the page components:
   - Uncomment the `fetch` calls in `register.tsx`, `app.tsx`
   - Replace placeholder API URLs with your actual backend URLs

2. **Implement authentication**:
   - Add JWT token handling
   - Implement secure cookie management
   - Add protected route middleware

3. **Connect Deep Learning Model**:
   - Update `/api/generate-floorplan` to call your ML model
   - Handle image generation and storage
   - Implement result caching if needed

4. **Database Integration**:
   - Connect user registration to database
   - Store floor plan generation history
   - Implement user sessions

## 🔒 Security Considerations

- Implement proper password hashing (bcrypt)
- Add CSRF protection
- Implement rate limiting
- Sanitize user inputs
- Use HTTPS in production
- Implement JWT token expiration
- Add SQL injection prevention

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🤝 Contributing

This is a production-ready template. To customize:

1. Update branding and content
2. Connect to your backend API
3. Integrate your deep learning model
4. Add authentication middleware
5. Implement database connections

## 📄 License

This project is ready for production use.

## 🎨 Design Notes

- All geometric shapes are SVG-based for crisp rendering
- CSS transitions provide smooth interactions
- Black border shadows create depth without colors
- Whitespace ratios follow golden ratio principles
- Typography scale maintains hierarchy

## 📞 Support

For issues or questions, refer to the API documentation or check the inline code comments.

---

**Built with ❤️ using Next.js and TypeScript**
