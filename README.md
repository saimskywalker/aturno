<div align="center">

# 🚀 Aturno

### *Organize Better, Together*

**The modern task management platform for teams**  
*Inspired by Linear's simplicity, built for Indonesian teams who value collaboration and clear organization.*

[![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![NextAuth.js](https://img.shields.io/badge/NextAuth.js-4.24.11-green?style=for-the-badge&logo=next.js)](https://next-auth.js.org/)

---

</div>

## ✨ What Makes Aturno Special?

> **Aturno** brings together the power of modern web technologies with thoughtful design to create a task management experience that's both powerful and delightful to use.

### 🎯 **Core Vision**
- **🇮🇩 Built for Indonesian Teams** - Designed with local collaboration patterns in mind
- **⚡ Lightning Fast** - Server-side rendering with optimal performance
- **📱 Mobile First** - Beautiful responsive design that works everywhere
- **🔒 Secure by Default** - Google OAuth integration with enterprise-grade security

---

## 🌟 Features That Shine

<table>
<tr>
<td width="50%">

### 🔐 **Smart Authentication**
- **Google OAuth Integration** with NextAuth.js
- **Session Management** with JWT tokens
- **Protected Routes** with auth guards
- **User Profiles** with avatar support

### 🏗️ **Responsive Architecture**
- **Component System** with reusable layouts
- **Mobile Navigation** with drawer support
- **Breakpoint Management** for all devices
- **Accessibility First** design principles

</td>
<td width="50%">

### 📊 **Powerful Dashboard**
- **Task Management** with priorities & filters
- **Project Tracking** with progress visualization
- **Team Collaboration** with member management
- **Real-time Updates** and activity feeds

### 🧭 **Intuitive Navigation**
- **Breadcrumb System** for easy wayfinding
- **Quick Actions** for common tasks
- **Global Search** across all content
- **Keyboard Shortcuts** for power users

</td>
</tr>
</table>

---

## 🛠️ Technology Stack

<div align="center">

### **Frontend Excellence**
![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### **Backend Power**
![Golang](https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white)
![Gin](https://img.shields.io/badge/Gin-00ADD8?style=for-the-badge&logo=go&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

### **Authentication & Security**
![NextAuth.js](https://img.shields.io/badge/NextAuth.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Google OAuth](https://img.shields.io/badge/Google_OAuth-4285F4?style=for-the-badge&logo=google&logoColor=white)

### **UI & Experience**
![Headless UI](https://img.shields.io/badge/Headless_UI-66E3FF?style=for-the-badge&logo=react&logoColor=black)
![Lucide Icons](https://img.shields.io/badge/Lucide_Icons-000000?style=for-the-badge&logo=lucide&logoColor=white)

### **Data & Integration**
![Google Sheets API](https://img.shields.io/badge/Google_Sheets_API-34A853?style=for-the-badge&logo=google-sheets&logoColor=white)

</div>

---

## 🚀 Installation & Setup

### **Prerequisites**
Before you begin, ensure you have the following installed on your machine:
- **Node.js 18+** ([Download here](https://nodejs.org/))
- **npm** (comes with Node.js) or **yarn**
- **Git** ([Download here](https://git-scm.com/))
- **Google Cloud Console Account** (for OAuth setup)

### **Step 1: Clone the Repository**
Open your terminal and run:
```bash
# Clone the repository
git clone git@github.com:saimskywalker/Aturno.git

# Navigate to project directory
cd Aturno

# Verify you're in the right directory
pwd
```

### **Step 2: Install Dependencies**
```bash
# Install project dependencies
npm install

# Or if you prefer yarn
yarn install

# Verify installation
npm list --depth=0
```

### **Step 3: Google OAuth Setup**
1. **Go to [Google Cloud Console](https://console.cloud.google.com/)**
2. **Create a new project** or select an existing one
3. **Enable Google+ API** and **Google Sheets API**
4. **Go to "Credentials"** → **"Create Credentials"** → **"OAuth 2.0 Client ID"**
5. **Set Application Type** to "Web Application"
6. **Add Authorized Redirect URIs:**
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - `https://yourdomain.com/api/auth/callback/google` (for production)
7. **Copy your Client ID and Client Secret**

### **Step 4: Environment Configuration**
```bash
# Copy environment template
cp .env.example .env.local

# Open the file in your preferred editor
nano .env.local
# or
code .env.local
```

Configure your `.env.local` file:
```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secure_secret_here_generate_with_openssl_rand

# Google OAuth Credentials (from Google Cloud Console)
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret

# Optional: Google Sheets API (if using sheets integration)
GOOGLE_SHEETS_API_KEY=your_google_sheets_api_key
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account@project.iam.gserviceaccount.com
```

> **💡 Pro Tip:** Generate a secure `NEXTAUTH_SECRET` using:
> ```bash
> openssl rand -base64 32
> ```

### **Step 5: Launch Development Server**
```bash
# Start the development server with Turbopack
npm run dev

# Or without Turbopack
npm run dev -- --no-turbo

# Server will start at http://localhost:3000
```

### **Step 6: Verify Installation**
1. **Open your browser** and navigate to `http://localhost:3000`
2. **Test authentication** by clicking "Sign In with Google"
3. **Check the console** for any errors:
   ```bash
   # In a new terminal tab
   npm run lint
   ```

🎉 **Congratulations!** Aturno is now running locally on your machine!

---

## 📱 Screenshots & Demo

<div align="center">

### 🏠 **Landing Page**
*Clean, modern design that welcomes users*

### 📊 **Dashboard Overview**
*Comprehensive stats and activity at a glance*

### ✅ **Task Management**
*Powerful filtering and organization tools*

### 👥 **Team Collaboration**
*Member management and project coordination*

</div>

---

## 🏗️ Architecture & Project Structure

### **Frontend Architecture**
```
src/
├── app/                    # Next.js 15 App Router
│   ├── dashboard/         # Dashboard pages & routes
│   ├── api/              # API routes & endpoints
│   │   ├── auth/         # NextAuth.js authentication
│   │   └── test-sheets/  # Google Sheets integration
│   └── auth/             # Authentication pages
├── components/           # Reusable UI components
│   ├── layout/          # Layout & navigation components
│   ├── features/        # Feature-specific components
│   ├── ui/              # Base UI components (buttons, cards)
│   └── landing/         # Landing page components
├── hooks/               # Custom React hooks
├── lib/                 # Utilities and configurations
├── providers/           # React context providers
├── services/            # External API integrations
└── types/               # TypeScript type definitions
```

### **Backend Architecture (Golang)**
```
backend/
├── cmd/
│   └── server/         # Application entry point
│       └── main.go    # Main server file
├── internal/
│   ├── api/           # API handlers and routes
│   │   ├── handlers/  # HTTP request handlers
│   │   └── routes/    # Route definitions
│   ├── middleware/    # HTTP middleware
│   │   ├── auth.go   # Authentication middleware
│   │   └── cors.go   # CORS middleware
│   ├── services/     # Business logic layer
│   │   ├── auth_service.go      # Authentication service
│   │   ├── task_service.go      # Task management service
│   │   └── project_service.go   # Project management service
│   ├── models/       # Data models and structures
│   └── config/       # Configuration management
├── pkg/              # Public packages
│   ├── database/     # Database connection and queries
│   ├── google/       # Google APIs integration
│   └── utils/        # Utility functions
├── go.mod           # Go module dependencies
└── go.sum          # Go module checksums
```

### **Key Features Implementation**
- **🔐 Authentication**: NextAuth.js frontend + Golang JWT backend
- **📊 Data Storage**: Google Sheets API integration via Golang
- **🎨 UI Framework**: Tailwind CSS + Headless UI
- **⚡ Performance**: Next.js 15 frontend + Golang backend
- **📱 Responsive**: Mobile-first design approach
- **🚀 Backend**: Golang with Gin/Fiber framework

---

## 🔗 API Documentation

### **Backend Server (Golang)**
Base URL: `http://localhost:8080/api/v1`

### **Authentication Endpoints**
```bash
# JWT Authentication
POST /api/v1/auth/login
POST /api/v1/auth/refresh
POST /api/v1/auth/logout

# Google OAuth
GET /api/v1/auth/google
GET /api/v1/auth/google/callback

# User Profile
GET /api/v1/auth/profile
```

### **Google Sheets Integration**
```bash
# Test Google Sheets Connection
GET /api/v1/sheets/test

# Response Format
{
  "status": "success",
  "message": "Connected to Google Sheets",
  "data": {
    "spreadsheetId": "your_sheet_id",
    "values": [...]
  }
}
```

### **Task Management API**
```bash
# Get Tasks
GET /api/v1/tasks

# Create Task
POST /api/v1/tasks
{
  "title": "Task Title",
  "description": "Task Description",
  "priority": "high",
  "assignee": "user@email.com",
  "status": "pending"
}

# Update Task
PUT /api/v1/tasks/:id

# Delete Task
DELETE /api/v1/tasks/:id

# Get Task by ID
GET /api/v1/tasks/:id
```

### **Project Management API**
```bash
# Get Projects
GET /api/v1/projects

# Create Project
POST /api/v1/projects
{
  "name": "Project Name",
  "description": "Project Description",
  "status": "active"
}

# Update Project
PUT /api/v1/projects/:id

# Delete Project
DELETE /api/v1/projects/:id
```

---

## 🛠️ Development Workflow

### **Available Scripts**

**Frontend (Next.js)**
```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint for code quality
```

**Backend (Golang)**
```bash
# Development
go run cmd/server/main.go     # Start Golang server
go build -o bin/server cmd/server/main.go  # Build for production
go test ./...                 # Run tests
go mod tidy                   # Clean up dependencies

# Using Air for hot reload (recommended for development)
air                          # Start with hot reload
```

### **Development Best Practices**
1. **🧪 Testing**: Always test authentication flow after changes
2. **📝 Linting**: Run `npm run lint` before committing
3. **🎨 Styling**: Follow Tailwind CSS conventions
4. **📱 Responsive**: Test on mobile devices
5. **🔒 Security**: Never commit API keys or secrets

---

## 🚀 Deployment Guide

### **Production Environment Setup**
```env
# Production .env
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your_production_secret_key
GOOGLE_CLIENT_ID=your_production_google_client_id
GOOGLE_CLIENT_SECRET=your_production_google_client_secret
```

### **Deploy to Vercel (Recommended)**
1. **Connect your GitHub repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy automatically** on every push to main branch

### **Deploy to Other Platforms**
```bash
# Build the application
npm run build

# Start production server
npm run start
```

---

## 🛠️ Troubleshooting

### **Common Issues**

**❌ Authentication Error**
```bash
# Check your Google OAuth setup
# Verify redirect URLs match exactly
# Ensure NEXTAUTH_SECRET is set
```

**❌ Build Errors**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

**❌ API Connection Issues**
```bash
# Verify Google Sheets API is enabled
# Check service account permissions
# Test API endpoints independently
```

### **Getting Help**
- **📖 Documentation**: Check Next.js and NextAuth.js docs
- **🐛 Issues**: Report bugs on GitHub Issues
- **💬 Discussions**: Join our community discussions

---

## 🎨 Design Philosophy

### **🎯 User-Centered Design**
Every interface element is crafted with the end-user in mind, ensuring intuitive workflows and minimal cognitive load.

### **🌐 Indonesian-First Approach**
Built specifically for Indonesian teams with cultural nuances, collaboration patterns, and local preferences in mind.

### **⚡ Performance Obsessed**
Leveraging Next.js 15's latest optimizations, server components, and intelligent caching for blazing-fast experiences.

### **📱 Mobile Excellence**
Mobile-first responsive design ensures perfect functionality across all devices, from smartphones to ultrawide monitors.

---

## 🤝 Contributing

We welcome contributions! Here's how you can help make Aturno even better:

1. **🍴 Fork the repository**
2. **🌿 Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **💫 Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **🚀 Push to the branch** (`git push origin feature/amazing-feature`)
5. **🎉 Open a Pull Request**

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🌟 Acknowledgments

- **Next.js Team** for the incredible framework
- **Vercel** for hosting and deployment platform
- **Tailwind CSS** for the utility-first styling approach
- **NextAuth.js** for seamless authentication
- **Indonesian Tech Community** for inspiration and feedback

---

---

## 🌱 **Filosofi Nama Aturno**

<div align="center">

### **"Yuk, kita atur bersama."**

</div>

> **Atur** - Berasal dari bahasa Indonesia yang berarti mengatur, menata, dan menyusun sesuatu agar rapi. Ini mencerminkan esensi Aturno sebagai platform yang membantu tim mengelola tugas, proyek, dan kolaborasi dengan lebih terstruktur.

> **-no** - Terinspirasi dari imbuhan Jawa yang memberi nuansa ajakan kolektif. Bukan sekadar mengatur untuk diri sendiri, tetapi mengajak semua anggota tim untuk mengatur bersama.

### 🔮 **Nilai Filosofis**

<table>
<tr>
<td align="center" width="33%">
<h4>🧘‍♂️ **Keteraturan → Ketenangan**</h4>
<p>Dengan mengatur, pekerjaan jadi lebih rapi, transparan, dan menenangkan pikiran.</p>
</td>
<td align="center" width="33%">
<h4>🤝 **Kebersamaan → Kekuatan**</h4>
<p>Imbuhan -no menekankan kolaborasi. Kekuatan tim muncul saat semua orang ikut teratur bersama.</p>
</td>
<td align="center" width="33%">
<h4>🇮🇩 **Lokalitas → Identitas**</h4>
<p>Dibuat dengan jiwa Indonesia, mengerti budaya gotong royong dan kerja bareng khas Nusantara.</p>
</td>
</tr>
</table>

---

<div align="center">

**[⭐ Star this repo](https://github.com/saimskywalker/Aturno)** if you find it helpful!

---

## 👨‍💻 **All Developer**

<table>
<tr>
<td align="center" width="33%">
<img src="https://github.com/saimskywalker.png" width="100" height="100" style="border-radius: 50%; border: 4px solid #4285f4;"/><br/>
<strong><a href="https://github.com/saimskywalker">saimskywalker</a></strong>
</td>
</tr>
</table>

---

### 🌟 **"Aturno - Organize Better, Together"**
### 💫 **Built with Indonesian spirit, crafted for global collaboration**

---

<p align="center">
<img src="https://img.shields.io/badge/Philosophy-Atur%20Bersama-blue?style=for-the-badge&logo=handshake"/>
<img src="https://img.shields.io/badge/Spirit-Gotong%20Royong-green?style=for-the-badge&logo=users"/>
<img src="https://img.shields.io/badge/Built%20in-🇮🇩%20Indonesia-red?style=for-the-badge"/>
</p>

---

<h3 align="center">🌱 Dari Indonesia, untuk dunia yang lebih teratur 🌍</h3>

</div>
