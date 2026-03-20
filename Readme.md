# IPIMS - Inventory Management System
This is a project that is tailored towards creating an inventory system for a pharmacy, it would have a checkout of drugs, a part to input the various drugs in the pharmacy inventory.

## 📋 Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Authentication Flow](#authentication-flow)
- [Integration Guide](#integration-guide)
- [API Documentation](#api-documentation)
- [Configuration](#configuration)
- [Development](#development)
- [Deployment](#deployment)

## 🎯 Introduction


### Key Capabilities

- **Multiple Auth Methods**: Email, phone number, password, and OTP verification
- **Mobile & Web Support**: Works seamlessly with both web and mobile deep links
- **Flexible Verification**: Supports both email and SMS/WhatsApp OTP verification
- **Invitation System**: Handle user invitations with custom password setup
- **Password Management**: Forgot password and update password flows
- **CheckOut**: Checkout drugs that are dispensed by a pharmacist
- **Inventory System**: Handle input of drugs brought to the pharmacy.

## ✨ Features

### Authentication Methods

- 📧 **Email Authentication**: Login with email and password
- 🔐 **Password Authentication**: Secure password-based login
- 🔢 **OTP Verification**: SMS/WhatsApp OTP codes for verification
- 📝 **Sign Up**: Complete user registration with verification
- 🔄 **Password Recovery**: Forgot password and reset functionality
- 🎫 **Invite System**: User invitation with password creation for an organization to the pharmacists under them


### Security Features

- JWT token-based authentication
- Secure token storage and management
- Cross-origin request handling
- Session timeout (24-hour storage)
- Email verification system
- Phone number verification

## 🛠 Technology Stack

### Core

- **Next.js 15.3.3** - React framework
- **React 19** - UI library
- **TypeScript 5** - Type safety
- **Turbo** - To handle monorepo

### UI & Styling

- **Pandacss** - CSS-in-JS styling
- **Motion** - Animations
- **React Icons** - Icons needed in the projecy
- **Lottie Files** - Animated illustrations

### State Management & Forms

- **Zustand** - State management
- **React Hook Form** - Form handling
- **@hookform/resolvers** - Form validation
- **prismaDB** - Database used


### HTTP & Networking

- **Axios** - HTTP client
- Custom interceptors for headers

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **Lint-staged** - Pre-commit linting
- **Commitlint** - Commit message validation
- **Sentry** - Error tracking

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Yarn 1.22.18+
- Access to backend API

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd ipims

# Install dependencies
npm install -g pnpm
pnpm install

# Copy environment file
node scripts/copy-env.js

# Run the development server
pnpm turbo dev
pnpm run dev
pnpm dev
pnpm turbo dev --filter=@ipims/web = this runs onl the frontend part of the project

```

The application will be available at `http://localhost:3000`

<!-- ### Environment Setup

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_BASE_URL=https://your-api-endpoint.com
``` -->

## 📁 Frontend Project Structure

```
apps/
├── api/                                # contains API that would be used
├── web/                                # contains what would be used 
│   ├── src/                            # Next.js src container pages
│   │   ├── app/                        # Next.js app Router pages
│   │   │   ├── (auth)/                 # Auth folder
│   │   │       ├── login/              # Log in folder
│   │   │       ├── sign-up/            # Sign Up folder
│   │   │       ├── forgot-password/    # Forgot password folder
│   │   │       ├── share-invite/       # Share invite folder
│   │   │   ├── favicon.ico/            # favicon
│   │   │   ├── globals.css/            # global styles
│   │   │   ├── layout.tsx/             # Layout
│   │   │   ├── loading.tsx/            # Loading page
│   │   │   ├── page.tsx/               # Home page
│   │   ├── components/                 # Components folder
│   │   ├── common/                     # Shared components
│   │   ├── layouts/                    # Page layouts
│   │   └── ui/                         # UI components
│   ├── services/                       # API services
│   │   ├── login.service.ts            # Login logic
│   │   ├── signup.service.ts           # Signup logic
│   │   ├── verification.service.ts     # Verification
│   │   ├── invite.service.ts           # Invite handling
│   │   └── types.ts                    # Type definitions
│   ├── hooks/                          # Custom React hooks
│   ├── utils/                          # Utility functions
│   │   ├── getSourceName.ts            # Source name mapping
│   │   ├── redirect.ts                 # Source redirect logic
│   │   └── sourceStorage.ts            # Source storage
│   └── .next/                          # 
│   └── node_modules                    # 
│   └── next-env.d.ts/                  # 
│   └── next.config.ts/                 # 
│   └── package.json/                   # 
│   └── tsconfig.json/                  # 
|_____
```

<!-- Damilare is to work on this -->
## 🔄 Authentication Flow

### Sign In Flow

1. **User Initiation**

   - User redirected from source app to SSO
   - Source parameters stored in localStorage

2. **User Identification** (Step 1)

   - Enter email or phone number
   - Enter country (if email)
   - System validates user exists

3. **User Selection** (Step 2)

   - Choose authentication method:
     - **Password**: Traditional password login
     - **OTP**: SMS/WhatsApp verification

4. **Authentication** (Step 3 if OTP)

   - Enter password OR
   - Receive and enter 6-digit OTP
   - Verify credentials

5. **Success & Redirect**
   - Token received from backend
   - Redirect to source application with token
   - Clear stored source data

### Verification Flow

- **Email Verification**: Via verification link
- **Phone Verification**: Via OTP code (SMS or WhatsApp)

## 🔗 Integration Guide

### Integrating Your Application with SSO

To integrate your application with this SSO system:

1. **Redirect to SSO**

   ```javascript
   const ssoUrl = new URL("https://your-sso-domain.com/signin");
   ssoUrl.searchParams.set("source", "https://your-app.com");
   ssoUrl.searchParams.set("sourceId", "your-source-id");
   ssoUrl.searchParams.set("countryId", "country-id");

   window.location.href = ssoUrl.toString();
   ```

2. **Receive Token**

   ```javascript
   const urlParams = new URLSearchParams(window.location.search);
   const token = urlParams.get("token");

   if (token) {
     // Store token and use for authenticated requests
     localStorage.setItem("auth_token", token);
   }
   ```

### Supported Parameters

| Parameter          | Type    | Required | Description                                  |
| ------------------ | ------- | -------- | -------------------------------------------- |
| `source`           | string  | Yes      | Return URL after authentication              |
| `sourceId`         | string  | Yes      | Application identifier (1=MOS, 2=DOS, 3=ROS) |
| `countryId`        | string  | No       | Pre-selected country                         |
| `isDedicatedApp`   | boolean | No       | Mobile app flag                              |
| `businessBranchId` | string  | No       | Business branch ID (DOS)                     |
| `businessId`       | string  | No       | Business ID (DOS)                            |
| `manufacturerId`   | string  | No       | Manufacturer ID                              |
| `isEmailExist`     | string  | No       | Email existence flag                         |

### Deep Link Support (Mobile)

For React Native apps using WebView:

```
myapp://auth?sourceId=1&source=myapp://dashboard
```

The SSO will automatically detect and handle mobile deep links.

## 📡 API Documentation

### Authentication Endpoints

#### Login

```
POST /UserAccount/user-login
```

**Request:**

```json
{
  "email": "user@example.com", // or "phoneNumber"
  "password": "password",
  "verificationMode": 1 // 1=password, 2=OTP
}
```

**Response:**

```json
{
  "token": "jwt-token-here",
  "jsonToken": "jwt-token-here"
}
```

#### Signup

```
POST /UserAccount/create-user-account
```

**Request:**

```json
{
  "email": "user@example.com",
  "phoneNumber": "1234567890",
  "fullName": "John Doe",
  "countryId": "1"
}
```

#### OTP Verification

```
POST /UserAccount/send-otp-verification  // Send OTP
POST /UserAccount/verify-otp             // Verify OTP
```

#### Email Verification

```
GET /UserAccount/verify-email?emailId={emailId}&verificationCode={code}
POST /UserAccount/send-verification-email
```

### Request Headers

All API requests include these headers:

- `SourceId`: Application identifier
- `CountryId`: User's country
- `BusinessBranchId`: Branch ID (if applicable)
- `BusinessId`: Business ID (if applicable)
- `JWT`: Authentication token (if present)

## ⚙️ Configuration

### Source Configuration

Sources are managed in `src/utils/getSourceName.ts`:


### Middleware Configuration

The middleware (`src/middleware.ts`) handles:

- Source URL validation
- Path rewriting
- Security validation

### Storage

- **localStorage**: Stores source information for 24 hours
- **sessionStorage**: Not used in current implementation
- Auto-cleanup on successful authentication

## 👨‍💻 Development

### Available Scripts

```bash
# Development server
yarn dev                   # Start with Turbopack on port 3050

# Build
yarn build                 # Production build with Panda CSS generation

# Start production server
yarn start                 # Next.js production server
yarn start:prod            # Custom production server

# Code quality
yarn lint                  # Run ESLint
yarn lint-fix              # Fix ESLint issues
yarn format                # Format with Prettier

# Panda CSS
yarn prepare:panda         # Generate CSS tokens
yarn prepare:panda-watch   # Watch mode for Panda CSS
```

### Code Style

- **ESLint**: Airbnb configuration with custom rules
- **Prettier**: Code formatting
- **TypeScript**: Strict mode enabled
- **Pre-commit hooks**: Automated linting via Husky

### Git Workflow

```bash
# Create a feature branch
git checkout -b feature/your-feature

# Make your changes and commit
git add .
git commit -m "feat: add new feature"

# Follow conventional commit format
```

## 🚢 Deployment

### Docker Deployment

A `Dockerfile` is included in the project:

```bash
# Build
docker build -t sso-app .

# Run
docker run -p 3050:3050 sso-app
```

### Environment Variables

Required for production:

- `NEXT_PUBLIC_BASE_URL`: Backend API URL

### Azure Pipelines

The project includes `azure-pipelines.yml` for CI/CD automation.

## 📝 Troubleshooting

### Common Issues

**Issue**: "Invalid source" error

- **Solution**: Ensure source URL is in allowed list in middleware

**Issue**: Token not being passed

- **Solution**: Check localStorage for source data and verify redirect parameters

**Issue**: OTP not received

- **Solution**: Verify phone number format and backend SMS service

### Debug Mode

Enable console logs for debugging:

- Middleware logs: `src/middleware.ts`
- Service logs: Check browser console
- Network logs: Check axios interceptors

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

[Add your license here]

## 👥 Support

For issues and questions, please contact the development team or create an issue in the repository.

---

**Last Updated**: [Current Date]
**Version**: 0.1.0
