# Angular Frontend Application

A modern, feature-rich Angular 19 frontend application with authentication, theming, and type-safe API communication. This application is part of a monorepo and is designed to work seamlessly with the Fastify backend API.

## Features

- **Modern Angular**: Built with Angular 19 using standalone components
- **Type-safe API**: tRPC client for end-to-end type safety with the backend
- **Authentication**: Comprehensive auth system with multiple authentication methods
- **State Management**: TanStack Query for efficient data fetching and caching
- **Form Handling**: TanStack Form for powerful form management
- **UI Components**: DaisyUI components with TailwindCSS 4
- **Theming**: Light/dark mode with system preference detection
- **Notifications**: Toast notifications with ngx-sonner
- **Icons**: Lucide icons for consistent and beautiful UI
- **Responsive Design**: Mobile-friendly layouts with responsive components

## Prerequisites

Before running this application, ensure you have the following installed:

- Node.js v18 or above
- [pnpm](https://pnpm.io/) v10.7.1 or later

## Getting Started

### Installation

From the root of the monorepo, install dependencies:

```bash
pnpm install
```

### Development Server

To start the development server:

```bash
# From the root of the monorepo
pnpm dev:web

# Or from the web directory
pnpm dev
```

The application will be available at `http://localhost:3001`. It automatically reloads when you make changes to the source files.

## Project Structure

```
src/
├── app/
│   ├── components/     # Reusable UI components
│   ├── guard/          # Route guards for authentication
│   ├── layouts/        # Page layout components
│   ├── models/         # Data models and interfaces
│   ├── screens/        # Page components
│   ├── services/       # Application services
│   ├── utils/          # Utility functions
│   ├── app.component.* # Root component
│   ├── app.config.ts   # Application configuration
│   └── app.routes.ts   # Application routes
├── assets/            # Static assets
└── styles.css         # Global styles with TailwindCSS
```

## Key Features

### Authentication

The application uses better-auth for authentication with multiple methods:

- Email/password authentication
- Email OTP verification
- Two-factor authentication
- Passkey support
- Anonymous authentication

### Routing and Navigation

The application has several main sections:

- **Public Pages**: Landing page and other public content
- **Authentication**: Login, signup, password recovery, and OTP verification
- **Account**: User profile and account management
- **Todo**: Example todo list application demonstrating CRUD operations

### Theming

The application supports light and dark themes with system preference detection. The theme can be toggled using the theme switcher component.

### API Communication

The application communicates with the backend using tRPC for type-safe API calls. This ensures that API contracts are enforced at compile time.

## Building for Production

To build the application for production:

```bash
# From the root of the monorepo
pnpm build

# Or from the web directory
pnpm build
```

This will create optimized production bundles in the `dist/` directory.

## Testing

To run unit tests:

```bash
pnpm test
```

The application uses Karma and Jasmine for unit testing.

## Code Quality

The project uses several tools to maintain code quality:

- **TypeScript**: Strict type checking
- **Biome**: Modern linting and formatting
- **Turborepo**: Build system caching and optimization

To lint the code:

```bash
pnpm lint
```

To format the code:

```bash
pnpm format
```

## Integration with Backend

This frontend application is designed to work with the Fastify backend API in this monorepo. It connects to the backend at `http://localhost:3000` by default.

## Environment Configuration

The application uses environment files for configuration:

- `environments/enviroments.ts` - Development environment
- `environments/environment.prod.ts` - Production environment

## Additional Resources

- [Angular Documentation](https://angular.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [DaisyUI Documentation](https://daisyui.com/docs/)
- [TanStack Query Documentation](https://tanstack.com/query/latest/docs/angular/overview)
- [TanStack Form Documentation](https://tanstack.com/form/latest/docs/angular/overview)
- [tRPC Documentation](https://trpc.io/docs/)
