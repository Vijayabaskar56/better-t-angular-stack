# Angular & Fastify Monorepo

A modern, full-stack TypeScript monorepo powered by [Turborepo](https://turbo.build/) featuring an Angular 19 frontend with a Fastify backend. This project provides a comprehensive foundation for building scalable web applications with best practices and modern tooling in place.

## Inpiration

This project was inspired by the [Better-t-stack](https://better-t-stack.amanv.dev/) loved the experience that I have had with it and wanted to create a similar setup with Angular and Fastify for my organization specific needs.

## Overview

This monorepo contains two main applications:

1. **Angular Frontend** - A feature-rich web application with authentication, theming, and type-safe API communication
2. **Fastify Backend** - A robust API server with MongoDB integration, authentication, and various plugins for enhanced functionality

Both applications are designed to work together seamlessly, with end-to-end type safety provided by tRPC.

## Features

- **Type-safe API Communication**: End-to-end type safety between frontend and backend using tRPC
- **Authentication System**: Comprehensive auth with multiple methods (email, OTP, passkeys, etc.)
- **Modern Frontend**: Angular 19 with standalone components, TanStack Query, and TailwindCSS
- **Robust Backend**: Fastify with plugins for MongoDB, Redis, file uploads, and more
- **Developer Experience**: Hot reloading, build caching, and efficient dependency management
- **Code Quality**: TypeScript, Biome linting, and formatting across all packages

## Getting Started

### Prerequisites

- Node.js >= 18
- [pnpm](https://pnpm.io/) (v10.7.1 or later)
- MongoDB (for the backend database)
- Redis (optional, for caching)

### Installation

Clone the repository and install dependencies:

```sh
git clone <repository-url>
cd <project-directory>
pnpm install
```

### Configuration

1. **Backend Configuration**:
   - Copy `apps/server/env.example` to `apps/server/.env`
   - Update the environment variables with your actual values

2. **Frontend Configuration**:
   - The frontend is pre-configured to connect to the backend at `http://localhost:3000`
   - If needed, modify `apps/web/src/app/environments/enviroments.ts`

### Development

Start all applications in development mode:

```sh
pnpm dev
```

Or run specific applications:

```sh
pnpm dev:web     # Run only the web application (port 3001)
pnpm dev:server  # Run only the server (port 3000)
```

### Building

Build all applications for production:

```sh
pnpm build
```

## Architecture

This monorepo is structured using Turborepo for efficient build orchestration and dependency management across multiple packages.

### Apps

- **web** - Angular 19 frontend application (port 3001)
  - Modern Angular with standalone components
  - TanStack Query for data fetching and state management
  - TanStack Form for form handling
  - TailwindCSS 4 with DaisyUI for styling
  - tRPC client for type-safe API communication
  - Light/dark theming with system preference detection
  - Comprehensive authentication with better-auth

- **server** - Fastify backend API (port 3000)
  - tRPC for type-safe API endpoints
  - MongoDB with Mongoose ODM
  - Fastify plugins for enhanced functionality
  - Redis integration for caching
  - S3-compatible storage for file uploads
  - Email sending with Nodemailer and Handlebars templates
  - Authentication with better-auth
  - Rate limiting, CORS, and other security features

### Tech Stack

#### Frontend (Angular)

- **Framework**: Angular 19
- **Styling**: TailwindCSS 4 with DaisyUI
- **State Management**: TanStack Query
- **Form Handling**: TanStack Form
- **Data Tables**: TanStack Table
- **Icons**: Lucide Angular
- **API Communication**: tRPC client
- **Type Validation**: Zod
- **Notifications**: ngx-sonner
- **Authentication**: better-auth

#### Backend (Fastify)

- **Framework**: Fastify 5
- **API**: tRPC for type-safe endpoints
- **Database**: MongoDB with Mongoose ODM
- **Caching**: Redis via @fastify/redis
- **File Storage**: S3-compatible storage
- **Email**: Nodemailer with Handlebars templates
- **Authentication**: better-auth, fastify-better-auth
- **Validation**: Zod
- **Documentation**: Swagger via @fastify/swagger
- **Security**: Rate limiting, CORS, Helmet

#### Development Tools

- **Monorepo Management**: Turborepo
- **Package Manager**: pnpm
- **Linting & Formatting**: Biome
- **Git Hooks**: simple-git-hooks with lint-staged
- **Testing**: Jest (backend), Karma/Jasmine (frontend)
- **TypeScript**: Strict mode enabled across all packages

## Project Structure

```text
├── apps/
│   ├── server/           # Fastify backend API
│   │   ├── src/
│   │   │   ├── db/       # Database models and configuration
│   │   │   ├── plugins/  # Fastify plugins
│   │   │   │   ├── external/  # Third-party plugins
│   │   │   │   └── custom/    # Custom application plugins
│   │   │   ├── routers/  # tRPC routers
│   │   │   ├── lib/      # Shared utilities
│   │   │   ├── types/    # TypeScript type definitions
│   │   │   ├── index.ts  # Main application entry point
│   │   │   └── server.ts # Fastify server configuration
│   └── web/              # Angular frontend
│       ├── src/
│       │   ├── app/      # Angular application code
│       │   │   ├── components/  # Reusable UI components
│       │   │   ├── guard/       # Route guards
│       │   │   ├── layouts/     # Page layouts
│       │   │   ├── models/      # Data models
│       │   │   ├── screens/     # Page components
│       │   │   ├── services/    # Application services
│       │   │   └── utils/       # Utility functions
│       │   ├── assets/    # Static assets
│       │   └── styles.css # Global styles
├── turbo.json            # Turborepo configuration
└── pnpm-workspace.yaml   # Workspace configuration
```

## Key Features

### Authentication

The application uses better-auth for authentication with multiple methods:

- Email/password authentication
- Email OTP verification
- Two-factor authentication
- Passkey support
- Anonymous authentication

### Type-Safe API Communication

tRPC provides end-to-end type safety between the frontend and backend:

- Backend defines procedures with input and output types
- Frontend automatically gets type information for API calls
- Compile-time errors for invalid API usage

### Database Management

The server application uses MongoDB with Mongoose ODM. Key models include:

- User management (accounts, sessions, verification)
- Todo items (example CRUD operations)

### Environment Variables

The server application uses environment variables for configuration. Create a `.env` file in the `apps/server` directory based on the `env.example` template.

Key environment variables include:

```env
# Server configuration
PORT=3000
NODE_ENV=production

# Database
DATABASE_URL=mongodb://localhost:27017/staterkit
DATABASE_NAME=staterkit

# Authentication
BETTER_AUTH_SECRET=your_auth_secret_here
COOKIE_SECRET=your_cookie_secret_here
COOKIE_NAME=your_cookie_name_here

# And more (see env.example for all variables)
```

## Development Workflow

### Code Quality

The project uses several tools to maintain code quality:

```sh
# Lint the code
pnpm lint

# Format the code
pnpm format

# Type check
pnpm check-types
```

### Testing

To run tests:

```sh
# Run all tests
pnpm test

# Run specific tests
cd apps/web && pnpm test
cd apps/server && pnpm test
```

## Deployment

This monorepo can be deployed in various ways:

1. **Separate Deployments**: Deploy the frontend and backend separately
2. **Monorepo Deployment**: Use platforms that support monorepo deployments

Both applications are optimized for production builds with the `pnpm build` command.

## Documentation

For more detailed documentation, see the README files in each application directory:

- [Frontend Documentation](apps/web/README.md)
- [Backend Documentation](apps/server/README.md)

## License

MIT
