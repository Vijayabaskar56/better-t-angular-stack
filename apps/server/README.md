# Fastify Backend API with tRPC, MongoDB, and Authentication

This is a robust backend API built with Fastify, tRPC, MongoDB, and various plugins for enhanced functionality. It provides a comprehensive foundation for building scalable web applications with features like authentication, file uploads, email sending, and more.

## Features

- **Type-safe API**: Built with tRPC for end-to-end type safety between frontend and backend
- **Authentication**: Integrated with better-auth for secure user authentication
- **Database**: MongoDB integration with Mongoose ODM
- **File Storage**: S3-compatible storage for file uploads
- **Email**: Nodemailer with Handlebars templates for email sending
- **Caching**: Redis integration for improved performance
- **Security**: Rate limiting, CORS, Helmet, and other security features
- **Documentation**: Swagger integration for API documentation
- **Validation**: Zod for schema validation

## Prerequisites

Before using this server, ensure that you have the following installed:

- Node.js v18 or above
- MongoDB
- Redis (optional, but recommended)
- S3-compatible storage (optional, for file uploads)

## Getting Started

1. Clone the repository
2. Install dependencies using `pnpm install`
3. Copy `env.example` to `.env` and configure your environment variables
4. Start the server using `pnpm dev:server`

## Environment Variables

The server uses various environment variables for configuration. Create a `.env` file in the `apps/server` directory with the following variables (see `env.example` for a template):

```env
PORT=3000
NODE_ENV=production

# Database
DATABASE_URL=mongodb://localhost:27017/staterkit
DATABASE_NAME=staterkit

# Server
FASTIFY_CLOSE_GRACE_DELAY=1000
LOG_LEVEL=info
BETTER_AUTH_SECRET=your_auth_secret_here

# Security
COOKIE_SECRET=your_cookie_secret_here
COOKIE_NAME=your_cookie_name_here
RATE_LIMIT_MAX=1000

# And more (see env.example for all variables)
```

## Project Structure

- `src/`
  - `index.ts` - Main application entry point
  - `server.ts` - Fastify server configuration
  - `lib/` - Shared utilities and helpers
    - `context.ts` - tRPC context creation
    - `trpc.ts` - tRPC router setup
  - `plugins/` - Fastify plugins
    - `external/` - Third-party plugins
    - `custom/` - Custom application plugins
  - `routers/` - tRPC API routes
    - `index.ts` - Main router definition
    - `todo.ts` - Todo-related routes
  - `db/` - Database models and configuration
    - `models/` - Mongoose models

## API Endpoints

The API is built with tRPC and exposed at `/api/trpc`. The main endpoints include:

- **Public Endpoints**:
  - `healthCheck` - Check if the API is running
  - `greeting` - Simple greeting message
  - `todo.*` - Todo CRUD operations

- **Protected Endpoints**:
  - `privateData` - Example of a protected endpoint requiring authentication

## Authentication

The server uses better-auth for authentication with the following features:

- Email OTP authentication
- Two-factor authentication
- Username-based authentication
- Anonymous authentication
- Admin functionality
- User verification and re-verification

## File Storage

The server supports file uploads to S3-compatible storage. Configure the following environment variables:

```env
S3_ENDPOINT=your_s3_endpoint
S3_SECRET_KEY=your_s3_secret_key
S3_ACCESS_ID=your_s3_access_id
S3_REGION=your_s3_region
S3_BUCKET=your_s3_bucket
```

## Email Sending

The server can send emails using Nodemailer with Handlebars templates. Configure the following environment variables:

```env
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
```

## Running the Server

To start the development server with hot reloading:

```bash
pnpm dev:server
```

To build and run the server in production mode:

```bash
pnpm build
pnpm start
```

## Testing

To run tests:

```bash
pnpm test
```

## Integration with Frontend

This server is designed to work with the Angular frontend in this monorepo. The frontend connects to the server using tRPC client for type-safe API calls.

## Health Checks

The server includes health checks to monitor its status. You can access the health check endpoint at `/api/trpc/healthCheck`.

## Security Considerations

The server includes several security features:

- Rate limiting to prevent abuse
- CORS configuration for secure cross-origin requests
- Helmet for HTTP header security
- Cookie security for authentication
- Input validation with Zod

## Performance Monitoring

The server includes the under-pressure plugin to monitor performance metrics like event loop delay, heap usage, and more.
