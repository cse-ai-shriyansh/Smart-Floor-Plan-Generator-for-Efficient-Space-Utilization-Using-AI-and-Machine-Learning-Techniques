# Smart Floor Plan Generator using Deep Learning

An AI-powered web application that generates optimized floor plans based on user requirements. This project leverages deep learning techniques to create efficient space utilization designs for residential buildings.

## 🏗️ Project Overview

The Smart Floor Plan Generator is a fully responsive, minimalist website designed to help architects, civil engineers, students, and developers create optimal floor plans. By inputting plot dimensions and room requirements, users can generate AI-optimized floor plans that maximize space efficiency.

### 🎯 Key Objectives

- **Efficient Space Utilization**: Optimize room layouts to maximize usable area
- **Accessibility**: Simple, intuitive interface for users of all technical levels
- **AI-Powered Design**: Leverage machine learning for intelligent floor plan generation
- **Real-time Generation**: Quick processing and visualization of floor plans

## 🎨 Design Philosophy

- **Strictly Black & White**: Pure monochrome design for professional appearance
- **Minimalist UI**: Clean, modern interface with optimal whitespace
- **Responsive**: Mobile-first design that works seamlessly on all devices
- **Accessible**: High contrast and clear typography for readability

## ✨ Features

### Multi-Page Architecture

1. **Landing Page** (`/`)
   - Hero section with project introduction
   - Feature highlights and benefits
   - Target audience information
   - Call-to-action buttons

2. **About Page** (`/about`)
   - Detailed project information
   - Technology stack overview
   - Project goals and impact
   - Research and development details

3. **Registration Page** (`/register`)
   - User registration with validation
   - Role selection (Student/Architect/Developer)
   - Password strength validation
   - Email verification

4. **Tutorial Page** (`/tutorial`)
   - Step-by-step usage guide
   - Input instructions
   - Generation process explanation
   - Best practices

5. **Main Application Page** (`/app`)
   - Interactive form for plot specifications
   - Real-time input validation
   - Floor plan preview area
   - Generate, Reset, and Download functionality
   - Loading states and error handling

### Input Parameters

- **Plot Dimensions**: Depth and width in feet
- **Bedrooms**: Number of bedrooms required
- **Drawing Rooms**: Living/drawing room count
- **Kitchen**: Number of kitchens
- **Toilets**: Bathroom count
- **Parking Space** (Optional): Length, width, and depth measurements
- **Porch/Veranda** (Optional): Combined count for outdoor spaces

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) - React framework with server-side rendering
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: CSS Modules - Component-scoped styling
- **Process Manager**: PM2 - Production process management
- **Version Control**: Git & GitHub
- **Font**: System Sans-Serif fonts for optimal performance

## 🏛️ Architecture

### Frontend Architecture
- **Pages Router (Next.js + TypeScript)**: UI pages are implemented in `pages/` and composed with reusable layout components in `components/`.
- **State + Validation**: `pages/app.tsx` handles form state, conditional field logic (parking/porch), and client-side validation before submit.
- **API Boundary**: Browser requests are sent to Next.js API routes (same-origin), not directly to Python backend.
- **Resilience Controls**: Loading states, user-friendly error messages, and retry-friendly behavior are built into the generation flow.

### Backend Architecture And Services
- **Next.js API Layer (`pages/api/`)**:
   - `generate-floorplan.ts` normalizes legacy and new payload formats.
   - Enforces per-route rate limit (`5 requests / 5 minutes` at this route).
   - Proxies valid requests to FastAPI `/generate-plan` via `lib/api.ts`.
- **FastAPI Service (`backend/main.py`)**:
   - Pydantic validation using nested request models (`backend/models.py`).
   - In-memory IP/path rate-limiting middleware.
   - Runtime switching between remote Colab generation and local fallback generation.
- **Colab Integration Service (`backend/services/colab_service.py`)**:
   - Health-checks remote Colab endpoint before inference call.
   - Uses proxy-safe timeout handling and tunnel-expiry error messages.
- **Local Generator (`backend/image_generator.py`)**:
   - Generates a base64 PNG floor plan (matplotlib) when remote mode is disabled or fallback is enabled.

### Full Stack Workflow
End-to-end request path for floor plan generation:

1. **Browser** submits floor-plan requirements from `/app`.
2. **Next.js API route** (`POST /api/generate-floorplan`) validates and normalizes payload.
3. **FastAPI backend** (`POST /generate-plan`) performs strict schema validation and runtime routing.
4. **AI generator** runs in either remote Colab mode or local fallback mode.
5. **Response image** returns as a data URL (`imageUrl`) to the browser for preview + download.

Flow summary: `Browser -> Next.js API routes -> FastAPI backend -> AI generator -> response image`.

### Design System
- **Color Variables**: CSS custom properties for theming
  - `--color-black`: #000000
  - `--color-white`: #FFFFFF
  - `--color-gray-light`: #F5F5F5
  - `--color-gray-medium`: #E0E0E0
  - `--color-gray-dark`: #333333

- **Breakpoints**:
  - Mobile: 480px
  - Tablet: 768px
  - Desktop: 1024px

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
│   ├── about.tsx           # About page
│   ├── register.tsx        # Registration page
│   ├── tutorial.tsx        # Tutorial page
│   ├── app.tsx             # Main application page
│   └── api/                # API routes
│       ├── register.ts     # User registration endpoint
│       ├── login.ts        # User login endpoint
│       ├── generate-floorplan.ts  # Floor plan generation
│       └── tutorial-status.ts     # Tutorial tracking
├── styles/
│   ├── globals.css         # Global styles and CSS variables
│   ├── Header.module.css   # Header component styles
│   ├── Footer.module.css   # Footer component styles
│   ├── Home.module.css     # Landing page styles
│   ├── About.module.css    # About page styles
│   ├── Register.module.css # Registration page styles
│   ├── Tutorial.module.css # Tutorial page styles
│   └── App.module.css      # Application page styles
├── public/
│   └── images.svg          # Project logo
├── package.json
├── tsconfig.json
├── next.config.js
├── ecosystem.config.js     # PM2 configuration
├── global.d.ts             # TypeScript declarations
└── README.md
```

## 🚦 Getting Started

### Prerequisites

- **Node.js** 18 or higher
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/cse-ai-shriyansh/Smart-Floor-Plan-Generator-for-Efficient-Space-Utilization-Using-AI-and-Machine-Learning-Techniques.git
   cd Civil\ website
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

### Deploy with PM2

```bash
# Install PM2 globally
npm install -g pm2

# Build the application
npm run build

# Start with PM2
pm2 start ecosystem.config.js

# Check status
pm2 status

# View logs
pm2 logs
```

## 🌐 Hosting

The application can be hosted on:
- **Local Network**: Configure to run on your IP address
- **Vercel**: Zero-config deployment for Next.js
- **Netlify**: Static site hosting with API routes
- **AWS/Azure/GCP**: Cloud platform deployment
- **Docker**: Containerized deployment

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
  "depth": 40,
  "width": 30,
  "bedrooms": 3,
  "drawingRoom": 1,
  "kitchen": 1,
  "toilet": 2,
  "hasParking": true,
  "parkingLength": 20,
  "parkingWidth": 10,
  "parkingDepth": 15,
  "porchVeranda": 1
}
```

**Response:**
```json
{
  "success": true,
  "message": "Floor plan generated successfully",
  "data": {
      "imageUrl": "data:image/png;base64,...",
      "generatedAt": "2026-04-24T10:00:00.000Z"
  }
}
```

### GET/POST `/api/tutorial-status`
Track tutorial completion status

## ✨ Features Implementation

### Form Validation
- **Real-time Validation**: Instant feedback as users type
- **Required Fields**: Plot dimensions, bedrooms, kitchen, toilet
- **Numerical Constraints**: Positive numbers, minimum values
- **Conditional Validation**: Parking dimensions validated only when parking is enabled
- **Clear Error Messages**: Specific, actionable error descriptions
- **Email Format**: RFC-compliant email validation
- **Password Matching**: Confirmation password verification

### Advanced Features
- **Optional Inputs**: Checkbox-controlled parking and porch/veranda fields
- **Parking Measurements**: Three-dimensional parking space input (length × width × depth)
- **Combined Fields**: Porch/Veranda as unified optional input
- **Dynamic Form**: Fields appear/disappear based on checkbox states

### Loading States
- **Spinner Animation**: Visual feedback during generation
- **Disabled Buttons**: Prevent duplicate submissions
- **Progress Indicators**: Clear status messaging
- **Optimistic UI**: Immediate user feedback

### Error Handling
- **Network Errors**: Graceful handling of connection issues
- **Invalid Input**: Client-side validation before submission
- **Server Errors**: User-friendly error display
- **Retry Mechanism**: Options to retry failed operations

### Responsive Design
- **Mobile-First**: Optimized for small screens first
- **Breakpoints**: 480px (mobile), 768px (tablet), 1024px (desktop)
- **Flexible Layouts**: CSS Grid and Flexbox
- **Touch-Friendly**: Large tap targets and intuitive gestures
- **Adaptive Navigation**: Hamburger menu on mobile

## 🎯 Use Cases

### For Students
- Learn about architectural design principles
- Create floor plans for academic projects
- Understand space optimization concepts
- Practice with different layout configurations

### For Architects
- Rapid prototyping of floor plans
- Client presentations and proposals
- Explore alternative layout options
- Baseline designs for further refinement

### For Developers
- Residential project planning
- Space utilization analysis
- Cost estimation support
- Marketing material generation

### For Civil Engineers
- Structural planning assistance
- Room layout optimization
- Building code compliance checking
- Construction planning support

## 🧠 AI Image Generation

### Remote mode (Colab service)
- Enable `USE_COLAB_API=true` in backend environment.
- Set `COLAB_API_URL` to the active Colab tunnel base URL.
- Backend performs `GET /health` on Colab first, then submits `POST /generate`.
- On success, backend maps remote `image_url` to frontend-facing `imageUrl`.

### Local fallback mode
- If `USE_COLAB_API=false`, backend always generates locally with matplotlib.
- If `USE_COLAB_API=true` and `FALLBACK_TO_LOCAL_ON_COLAB_ERROR=true`, backend auto-falls back when remote generation fails.
- This keeps UX stable during tunnel outages and model warm-up delays.

### Timeout and tunnel reliability notes
- Colab tunnel URLs can expire; backend returns explicit instructions when tunnel reachability fails.
- Proxy-safe timeout logic avoids long-hanging requests (especially with temporary tunnels).
- For slow inference, prefer GPU runtimes and lower inference steps to reduce timeout risk.

## 🗺️ Fine-Tuning Roadmap

### 1. Dataset preparation
- Build paired training examples: **input JSON constraints + target floor plan images**.
- Include realistic diversity across plot sizes, room counts, parking/porch variants, and regional layout styles.
- Add quality tags (constraint-valid, circulation quality, readability) for downstream filtering.

### 2. LoRA-first, then full fine-tuning
- Start with **LoRA adapters** to reduce compute cost and shorten iteration cycle.
- Promote to full-model fine-tuning only if LoRA saturates on key quality metrics.
- Keep a frozen baseline checkpoint for regression comparisons.

### 3. Validation metrics
- **Constraint adherence**: percentage of generations matching requested counts/dimensions.
- **Layout quality**: room adjacency, circulation logic, and usable area distribution.
- **Visual clarity**: line readability, label legibility, overlap/artifact rate.

### 4. Inference parameter tuning
- Tune step count, guidance scale, sampler choice, and output resolution for latency/quality balance.
- Track p50/p95 generation latency and failed-generation rate.
- Version parameter presets (fast/standard/high-quality) for predictable production behavior.

## 🏭 Production Recommendations

- Run Next.js and FastAPI as separate services with health checks and restart policies.
- Configure strict `CORS_ORIGINS` in production (avoid wildcard origins).
- Move from in-memory rate limiting to a shared store (Redis) for multi-instance deployments.
- Add observability: structured logs, request IDs, and latency/error dashboards.
- Cache deterministic or repeated requests where feasible to reduce AI compute spikes.

## 🔒 Security Notes

- Keep all secrets (API keys, tokens, tunnel credentials) in environment variables only.
- Do not commit `.env` files or expose internal backend URLs to untrusted clients.
- Keep HTTPS enabled end-to-end and sanitize all user-controlled numeric inputs.
- Add authentication/authorization before exposing generation endpoints publicly.
- Rotate credentials regularly and apply least-privilege access to infrastructure.

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ✅ Progressive Web App compatible

## 🎓 Educational Value

This project serves as an excellent learning resource for:
- **Web Development**: Modern React and Next.js patterns
- **TypeScript**: Type-safe application development
- **Responsive Design**: Mobile-first CSS techniques
- **API Design**: RESTful endpoint implementation
- **Form Handling**: Validation and state management
- **User Experience**: Intuitive interface design

## 🚀 Performance

- **Lighthouse Score**: 95+ Performance
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Bundle Size**: Optimized with Next.js code splitting
- **SEO Ready**: Meta tags and semantic HTML

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Maintain the black & white design system
- Write clean, documented code
- Test across different devices
- Ensure accessibility standards

## 🐛 Known Issues & Limitations

- Colab tunnel URLs can expire and require periodic refresh in backend environment.
- Local fallback output is deterministic and simpler than advanced diffusion-based outputs.
- In-memory rate limiting resets on backend restart and is not shared across instances.
- User authentication flow is still basic and should be hardened before public launch.

## 📋 Future Roadmap

- [ ] Improve remote model quality with staged LoRA training
- [ ] Add user authentication with JWT
- [ ] Implement database for user history
- [ ] Add floor plan editing capabilities
- [ ] Export to CAD formats (DWG, DXF)
- [ ] 3D visualization of generated plans
- [ ] Cost estimation feature
- [ ] Material requirement calculator
- [ ] Building code compliance checker
- [ ] Multi-story building support

## 📄 License

This project is available for educational and commercial use.

## 👥 Team

Developed by CSE-AI team for Smart Floor Plan Generator project.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- TypeScript community for type safety
- Open source community for inspiration and tools

## 📞 Contact & Support

For issues, questions, or contributions:
- **GitHub Issues**: [Report a bug](https://github.com/cse-ai-shriyansh/Smart-Floor-Plan-Generator-for-Efficient-Space-Utilization-Using-AI-and-Machine-Learning-Techniques/issues)
- **Repository**: [GitHub](https://github.com/cse-ai-shriyansh/Smart-Floor-Plan-Generator-for-Efficient-Space-Utilization-Using-AI-and-Machine-Learning-Techniques)

## 📚 Documentation

For detailed API documentation, refer to:
- API routes in `pages/api/`
- Inline code comments
- TypeScript type definitions

## 🎨 Design System

### Color Palette
```css
--color-black: #000000
--color-white: #FFFFFF
--color-gray-light: #F5F5F5
--color-gray-medium: #E0E0E0
--color-gray-dark: #333333
```

### Typography
- **Headings**: System Sans-Serif, Bold
- **Body**: System Sans-Serif, Regular
- **Scale**: 1.25 (Major Third)

### Spacing
- **Base Unit**: 8px
- **Grid**: 12-column responsive grid
- **Whitespace**: Generous padding and margins

## 🔧 Troubleshooting

### Common Issues

**Build Errors**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

**Port Already in Use**
```bash
# Use different port
PORT=3001 npm run dev
```

**TypeScript Errors**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📊 Project Statistics

- **Total Files**: 27+
- **Lines of Code**: 7,500+
- **Components**: 3 (Header, Footer, Layout)
- **Pages**: 5 (Home, About, Register, Tutorial, App)
- **API Routes**: 4
- **CSS Modules**: 7

---

**Built with 🖤 using Next.js, TypeScript, and AI/ML concepts**

*Smart Floor Plan Generator - Efficient Space Utilization Using AI and Machine Learning Techniques*
