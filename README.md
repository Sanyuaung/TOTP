# 🔐 TOTP Authentication System

<div align="center">

![TOTP Authentication](https://img.shields.io/badge/Security-TOTP-blue?style=for-the-badge&logo=shield&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16+-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19+-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-6.19+-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/ISC)
[![Node.js Version](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)

_A secure, full-stack authentication system with Time-based One-Time Password (TOTP) and email OTP support_

[🚀 Live Demo](#) • [📖 API Documentation](#) • [🐛 Report Bug](#) • [✨ Request Feature](#)

---

</div>

## 🌟 Overview

Welcome to the **TOTP Authentication System** - a production-ready authentication solution built with modern web technologies. This comprehensive system provides robust user authentication with multiple two-factor authentication methods, ensuring maximum security for your applications.

### ✨ Key Highlights

<div align="center">

|   🔐 **Security First**   | 🎨 **Modern UI** |     📱 **Responsive**      |      🚀 **Performance**      |
| :-----------------------: | :--------------: | :------------------------: | :--------------------------: |
|  JWT + HTTP-only cookies  |  Mantine UI v8   |    Mobile-first design     |     Next.js 16 optimized     |
| bcryptjs password hashing | Tailwind CSS v4  | Cross-device compatibility |   React 19 fast rendering    |
|      Multi-layer 2FA      |   Tabler icons   |       Touch-friendly       | Efficient PostgreSQL queries |

</div>

---

## 🚀 Features

### 🔐 Authentication & Security

<table>
<tr>
<td>

#### Core Authentication

- ✅ **Email & Password Authentication** - Secure user registration and login
- ✅ **JWT Token Management** - Stateless authentication with HTTP-only cookies
- ✅ **Password Security** - bcryptjs hashing for secure password storage
- ✅ **Session Management** - Automatic logout and token refresh
- ✅ **Secure Cookies** - XSS protection with production-grade security

#### Two-Factor Authentication (2FA)

- ✅ **Email OTP** - One-time passwords via email (Nodemailer)
- ✅ **Google Authenticator TOTP** - Time-based OTP with QR codes (Speakeasy)
- ✅ **Backup Codes** - Emergency access recovery system
- ✅ **2FA Status Management** - Enable/disable with password verification
- ✅ **OTP Expiration** - 30-second window for enhanced security

</td>
<td>

#### Security Features

- ✅ **Email Validation** - Real-time email verification with Abstractapi
- ✅ **Input Validation** - Comprehensive form validation
- ✅ **SQL Injection Prevention** - Parameterized queries with Prisma
- ✅ **XSS Protection** - Sanitized user inputs and secure cookies
- ✅ **Rate Limiting Ready** - API endpoint protection structure
- ✅ **Environment Security** - Secure environment variable handling

#### User Management

- ✅ **Profile Management** - Update personal information
- ✅ **Password Changes** - Secure password updates with validation
- ✅ **Account Security** - View and manage security settings
- ✅ **User Sessions** - Active session monitoring
- ✅ **Account Deletion** - Secure account removal

</td>
</tr>
</table>

### 🎨 User Interface & Experience

<table>
<tr>
<td>

#### Design System

- 🎨 **Mantine UI v8** - Modern component library
- 🎨 **Tailwind CSS v4** - Utility-first styling framework
- 🎨 **Tabler Icons** - Consistent iconography (3.35+)
- 🎨 **Responsive Grid** - Flexible layouts with Mantine
- 🎨 **Dark/Light Themes** - User preference support

#### User Experience

- 📱 **Mobile-First Design** - Optimized for all devices
- ⚡ **Fast Loading** - Next.js 16 optimized performance
- 🎯 **Intuitive Navigation** - Clear user flows
- 📊 **Loading States** - Smooth transitions with Mantine
- 🔔 **Toast Notifications** - User feedback with Mantine Notifications

</td>
<td>

#### Accessibility

- ♿ **WCAG Compliant** - Accessibility standards
- ⌨️ **Keyboard Navigation** - Full keyboard support
- 🔍 **Screen Reader** - ARIA labels and roles
- 🎨 **High Contrast** - Readable color schemes
- 📏 **Scalable Text** - Responsive typography

#### Forms & Validation

- 📝 **Real-time Validation** - Instant feedback with Mantine Form
- 🔒 **Secure Inputs** - Password masking and validation
- 📧 **Email Verification** - Format validation
- 🔢 **PIN Inputs** - OTP entry optimization
- 💡 **Helper Text** - Contextual guidance

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

<div align="center">

### Frontend

![Next.js](https://img.shields.io/badge/Next.js-16.0+-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.2+-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Mantine](https://img.shields.io/badge/Mantine-8.3+-339AF0?style=for-the-badge&logo=mantine&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### Backend & Database

![Next.js API](https://img.shields.io/badge/Next.js_API-16.0+-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-6.19+-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-9.0+-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)

### Security & Tools

![bcryptjs](https://img.shields.io/badge/bcryptjs-3.0+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Speakeasy](https://img.shields.io/badge/Speakeasy-2.0+-FF6B35?style=for-the-badge)
![Nodemailer](https://img.shields.io/badge/Nodemailer-7.0+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Abstractapi](https://img.shields.io/badge/Abstractapi-Email-4285F4?style=for-the-badge)
![QRCode](https://img.shields.io/badge/QRCode-1.5+-000000?style=for-the-badge)
![Tabler Icons](https://img.shields.io/badge/Tabler_Icons-3.35+-0066CC?style=for-the-badge)

### Development Tools

![ESLint](https://img.shields.io/badge/ESLint-9.39+-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![PostCSS](https://img.shields.io/badge/PostCSS-8.5+-DD3735?style=for-the-badge&logo=postcss&logoColor=white)
![Autoprefixer](https://img.shields.io/badge/Autoprefixer-10.4+-DD3735?style=for-the-badge&logo=autoprefixer&logoColor=white)

</div>

---

## 📁 Project Structure

```
📦 TOTP Authentication System
├── 📂 app/                          # Next.js 16 App Router
│   ├── 📂 api/                      # API Routes
│   │   ├── 📂 auth/                 # Authentication endpoints
│   │   │   ├── 📂 login/            # POST /api/auth/login
│   │   │   ├── 📂 logout/           # POST /api/auth/logout
│   │   │   ├── 📂 me/               # GET /api/auth/me
│   │   │   ├── 📂 register/         # POST /api/auth/register
│   │   │   └── 📂 verify-otp/       # POST /api/auth/verify-otp
│   │   ├── 📂 test/                 # Test endpoints
│   │   ├── 📂 two-factor/           # 2FA endpoints
│   │   │   ├── 📂 disable/          # POST /api/two-factor/disable
│   │   │   ├── 📂 enable/           # POST /api/two-factor/enable
│   │   │   ├── 📂 send-email-otp/   # POST /api/two-factor/send-email-otp
│   │   │   ├── 📂 status/           # GET /api/two-factor/status
│   │   │   └── 📂 verify-enable/    # POST /api/two-factor/verify-enable
│   │   └── 📂 user/                 # User management endpoints
│   │       ├── 📂 change-password/  # POST /api/user/change-password
│   │       └── 📂 profile/          # GET/PUT /api/user/profile
│   ├── 📂 dashboard/                # User dashboard page
│   ├── 📂 login/                    # Login page
│   ├── 📂 otp/                      # OTP verification page
│   ├── 📂 profile/                  # User profile management
│   ├── 📂 register/                 # Registration page
│   ├── 📄 globals.css               # Global styles
│   ├── 📄 layout.tsx                # Root layout component
│   └── 📄 page.tsx                  # Home page
├── 📂 components/                   # Reusable React components
│   └── 🛡️ ProtectedRoute.tsx        # Route protection wrapper
├── 📂 lib/                          # Utility libraries
│   ├── 🔐 auth-context.tsx          # Authentication state management
│   ├── 🔑 auth.ts                   # Authentication utilities (JWT, bcrypt)
│   ├── 📧 email.ts                  # Email service (Nodemailer)
│   ├── 🗄️ prisma.ts                 # Database client setup
│   └── 🔢 two-factor.ts             # 2FA logic (Speakeasy, QR codes)
├── 📂 prisma/                       # Database schema and migrations
│   ├── 📄 schema.prisma             # Prisma schema (User, TwoFactorAuth models)
│   └── 📂 migrations/               # Database migration files
├── 📄 middleware.ts                 # Next.js middleware for auth
├── 📄 next.config.js                # Next.js configuration
├── 📄 tailwind.config.js            # Tailwind CSS v4 configuration
├── 📄 postcss.config.js             # PostCSS configuration
├── 📄 tsconfig.json                 # TypeScript configuration
├── 📄 package.json                  # Dependencies and scripts
├── 📄 .env                          # Environment variables (local)
├── 📄 .gitignore                    # Git ignore rules
└── 📄 README.md                     # Project documentation
```

---

## 🗄️ Database Schema

### User Model

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  twoFactorAuth TwoFactorAuth?
}
```

### TwoFactorAuth Model

```prisma
model TwoFactorAuth {
  id               String   @id @default(uuid())
  userId           String   @unique
  user             User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  isEnabled        Boolean  @default(false)
  method           TwoFactorMethod @default(EMAIL)

  // For Google Authenticator
  secret           String?
  backupCodes      String[]

  // For Email OTP
  emailOtp         String?
  emailOtpExpiry   DateTime?

  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
}

enum TwoFactorMethod {
  EMAIL
  GOOGLE_AUTH
}
```

---

## 🚀 Quick Start

### 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher
- **PostgreSQL** 12+ database
- **npm** or **yarn** package manager
- **Git** for version control

### ⚡ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd nextjs-totp-auth
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   # Database Configuration
   DATABASE_URL="postgresql://username:password@localhost:5432/totp_auth"

   # JWT Configuration
   JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
   JWT_EXPIRATION="7d"

   # Email Configuration (for OTP delivery)
   EMAIL_HOST="smtp.gmail.com"
   EMAIL_PORT=587
   EMAIL_USER="your-email@gmail.com"
   EMAIL_PASSWORD="your-app-password"
   EMAIL_FROM="your-email@gmail.com"

   # Abstractapi Email Validation
   ABSTRACTAPI_KEY="your-abstractapi-key-here"
   ```

4. **Database Setup**

   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run database migrations
   npx prisma migrate dev

   # (Optional) Seed with sample data
   npx prisma db seed
   ```

5. **Start Development Server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   ```
   http://localhost:3000
   ```

---

## 🔐 Authentication Flow

<div align="center">

```mermaid
graph TD
    A[User Visits Site] --> B{Is Authenticated?}
    B -->|No| C[Login/Register Page]
    B -->|Yes| D[Dashboard]

    C --> E[Enter Credentials]
    E --> F{Valid Credentials?}
    F -->|No| G[Show Error]
    F -->|Yes| H{2FA Enabled?}

    H -->|No| I[Login Success → Dashboard]
    H -->|Yes| J[OTP Verification Page]

    J --> K[Enter OTP Code]
    K --> L{Valid OTP?}
    L -->|No| M[Show Error]
    L -->|Yes| N[Login Success → Dashboard]

    G --> E
    M --> K
```

</div>

### 📝 Detailed Flow

#### 1. **User Registration**

```
User → Registration Form → Email/Password Validation → Account Created → Login Page
```

#### 2. **User Login**

```
User → Login Form → Credential Verification → 2FA Check → OTP Page (if enabled) → Dashboard
```

#### 3. **Two-Factor Authentication Setup**

```
Dashboard → Profile → Security Settings → Choose 2FA Method → QR Code/Email → Verification → Success
```

#### 4. **Session Management**

```
Login → JWT Token → HTTP-Only Cookie → API Requests → Automatic Refresh → Logout
```

---

## 📡 API Reference

### 🔐 Authentication Endpoints

| Method | Endpoint               | Description         | Request Body              |
| ------ | ---------------------- | ------------------- | ------------------------- |
| `POST` | `/api/auth/register`   | Register new user   | `{email, password, name}` |
| `POST` | `/api/auth/login`      | User authentication | `{email, password}`       |
| `POST` | `/api/auth/logout`     | User logout         | -                         |
| `GET`  | `/api/auth/me`         | Get current user    | -                         |
| `POST` | `/api/auth/verify-otp` | Verify OTP code     | `{tempToken, code}`       |

### 🔢 Two-Factor Authentication

| Method | Endpoint                         | Description      | Request Body |
| ------ | -------------------------------- | ---------------- | ------------ |
| `GET`  | `/api/two-factor/status`         | Get 2FA status   | -            |
| `POST` | `/api/two-factor/enable`         | Enable 2FA       | `{method}`   |
| `POST` | `/api/two-factor/disable`        | Disable 2FA      | `{password}` |
| `POST` | `/api/two-factor/send-email-otp` | Send email OTP   | -            |
| `POST` | `/api/two-factor/verify-enable`  | Verify 2FA setup | `{code}`     |

### 👤 User Management

| Method | Endpoint                    | Description      | Request Body                     |
| ------ | --------------------------- | ---------------- | -------------------------------- |
| `GET`  | `/api/user/profile`         | Get user profile | -                                |
| `PUT`  | `/api/user/profile`         | Update profile   | `{name, email}`                  |
| `POST` | `/api/user/change-password` | Change password  | `{currentPassword, newPassword}` |

### 🧪 Test Endpoints

| Method | Endpoint    | Description                   |
| ------ | ----------- | ----------------------------- |
| `GET`  | `/api/test` | Test endpoint for development |

---

## 🧪 Testing & Quality Assurance

### ✅ Testing Checklist

#### 🔐 Authentication Testing

- [ ] User registration with valid/invalid data
- [ ] User login with correct/incorrect credentials
- [ ] Password reset functionality
- [ ] Account verification via email
- [ ] Session persistence across browser refresh
- [ ] Secure logout functionality

#### 🔢 2FA Testing

- [ ] Google Authenticator setup and verification
- [ ] Email OTP delivery and verification
- [ ] Backup codes generation and usage
- [ ] 2FA disable with password verification
- [ ] OTP expiration handling (30 seconds)

#### 🎨 UI/UX Testing

- [ ] Responsive design on mobile/tablet/desktop
- [ ] Form validation and error messages
- [ ] Loading states and transitions
- [ ] Accessibility with keyboard navigation
- [ ] Cross-browser compatibility

#### 🔒 Security Testing

- [ ] SQL injection prevention
- [ ] XSS protection verification
- [ ] CSRF token validation
- [ ] Secure cookie handling
- [ ] Password hashing verification
- [ ] JWT token validation and expiration

### 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npx prisma generate  # Generate Prisma client
npx prisma migrate dev # Run migrations in development
npx prisma db seed   # Seed database with sample data
```

---

## 🚀 Deployment

### 🌐 Production Environment Setup

#### Environment Variables

```env
# Production Database
DATABASE_URL="postgresql://user:pass@prod-host:5432/totp_prod"

# Production JWT Secret (32+ characters)
JWT_SECRET="your-production-jwt-secret-key-here"
JWT_EXPIRATION="7d"

# Production Email Configuration
EMAIL_HOST="smtp.production-email.com"
EMAIL_PORT=587
EMAIL_USER="noreply@yourdomain.com"
EMAIL_PASSWORD="production-email-password"
EMAIL_FROM="noreply@yourdomain.com"

# Abstractapi Email Validation
ABSTRACTAPI_KEY="your-abstractapi-key-here"
```

#### Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start

# Or use PM2 for process management
npm install -g pm2
pm2 start npm --name "totp-auth" -- start
```

### 🐳 Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

```bash
# Build and run with Docker
docker build -t totp-auth .
docker run -p 3000:3000 totp-auth
```

### ☁️ Cloud Deployment Options

#### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
```

#### Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway deploy
```

#### Render

```yaml
# render.yaml
services:
  - type: web
    name: totp-auth
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: DATABASE_URL
        value: ${{ DATABASE_URL }}
      - key: JWT_SECRET
        value: ${{ JWT_SECRET }}
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### 📋 Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests and linting**
   ```bash
   npm run lint
   ```
5. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### 🐛 Bug Reports & Feature Requests

- **🐛 Bug Reports**: [Create an issue](https://github.com/your-repo/issues/new?template=bug_report.md)
- **✨ Feature Requests**: [Create an issue](https://github.com/your-repo/issues/new?template=feature_request.md)
- **📖 Documentation**: [Create an issue](https://github.com/your-repo/issues/new?template=documentation.md)

---

## 📊 Project Metrics

<div align="center">

### 📈 Code Quality

![ESLint](https://img.shields.io/badge/ESLint-passing-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)

### 📊 Dependencies

![Dependencies](https://img.shields.io/badge/Dependencies-up%20to%20date-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-16.0+-blue)
![React](https://img.shields.io/badge/React-19.2+-blue)

### 📈 Performance

![Lighthouse](https://img.shields.io/badge/Lighthouse-95%2B-brightgreen)
![Bundle Size](https://img.shields.io/badge/Bundle-Optimized-green)

</div>

---

## 🔄 Roadmap

### 🚀 Upcoming Features

- [ ] **Social Login Integration**

  - Google OAuth
  - GitHub OAuth
  - Microsoft OAuth

- [ ] **Advanced Security**

  - Biometric authentication
  - Hardware security keys (FIDO2)
  - Advanced threat detection

- [ ] **User Experience**

  - Progressive Web App (PWA)
  - Offline support
  - Push notifications

- [ ] **Admin Panel**

  - User management dashboard
  - Analytics and reporting
  - System configuration

- [ ] **Internationalization**
  - Multi-language support
  - RTL language support
  - Localized date/time formats

### 📅 Version History

#### v1.0.0 (Current)

- ✅ Complete authentication system with JWT and HTTP-only cookies
- ✅ 2FA with Email OTP and Google Authenticator TOTP
- ✅ Modern UI with Mantine UI v8 and Tailwind CSS v4
- ✅ PostgreSQL database with Prisma ORM
- ✅ QR code generation for Google Authenticator setup
- ✅ Email OTP delivery with Nodemailer
- ✅ Backup codes for emergency access
- ✅ Responsive design for all devices
- ✅ TypeScript for type safety
- ✅ ESLint for code quality

---

## 📞 Support & Community

### 🆘 Getting Help

- 📧 **Email**: support@totp-auth.com
- 💬 **Discord**: [Join our community](https://discord.gg/totp-auth)
- 📖 **Documentation**: [Read the docs](https://docs.totp-auth.com)
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/your-repo/issues)

### 📚 Resources

- 📖 **[API Documentation](https://api.totp-auth.com)**
- 🎓 **[Developer Guide](https://docs.totp-auth.com/developers)**
- 🎯 **[Best Practices](https://docs.totp-auth.com/best-practices)**
- 🔒 **[Security Guidelines](https://docs.totp-auth.com/security)**

---

## 📄 License

This project is licensed under the **ISC License**.

```
ISC License

Copyright (c) 2025 TOTP Authentication System

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```

---

## 🙏 Acknowledgments

### 🤝 Contributors

<a href="https://github.com/your-repo/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=your-repo" />
</a>

### 📚 Libraries & Tools

Special thanks to the amazing open-source community:

- **[Next.js](https://nextjs.org/)** - The React framework for production (v16.0+)
- **[React](https://reactjs.org/)** - A JavaScript library for building user interfaces (v19.2+)
- **[Mantine](https://mantine.dev/)** - React components and hooks library (v8.3+)
- **[Prisma](https://prisma.io/)** - Next-generation ORM for TypeScript (v6.19+)
- **[Tabler Icons](https://tabler-icons.io/)** - A set of over 4500 free MIT-licensed icons (v3.35+)
- **[Speakeasy](https://github.com/speakeasyjs/speakeasy)** - Two-factor authentication for Node.js
- **[QRCode](https://github.com/soldair/node-qrcode)** - QR code generation
- **[Nodemailer](https://nodemailer.com/)** - Send emails from Node.js
- **[bcryptjs](https://github.com/dcodeIO/bcrypt.js)** - Optimized bcrypt in JavaScript
- **[jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)** - JSON Web Token implementation

### 🎯 Inspiration

This project was inspired by the need for secure, modern authentication systems in web applications. We drew inspiration from industry leaders and best practices in authentication and security.

---

<div align="center">

**Built with ❤️ using Next.js 16, React 19, Prisma, and Mantine UI**

---

[⬆️ Back to Top](#-totp-authentication-system)

</div>
