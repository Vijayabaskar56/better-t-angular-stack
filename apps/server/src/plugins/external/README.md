# External Plugins

This directory contains third-party Fastify plugins that provide core functionality to the application. These plugins are loaded before custom plugins and provide the foundation for the application's features.

## Available Plugins

### CORS (`cors.ts`)

Enables Cross-Origin Resource Sharing (CORS) for the API.

- **Package**: `@fastify/cors`
- **Configuration**:
  - Methods: GET, POST, PUT, DELETE
  - Origin: http://localhost:3001 (configurable)
  - Credentials: true (allows cookies in cross-origin requests)
- **Environment Variables**:
  - `CORS_ORIGIN`: Allowed origin for CORS requests

### Environment Variables (`env.ts`)

Loads and validates environment variables from `.env` file.

- **Package**: `@fastify/env`
- **Features**:
  - Type-safe environment variables
  - Validation with JSON Schema
  - Default values for optional variables
- **Usage**:
  ```typescript
  // Access environment variables
  fastify.config.PORT
  fastify.config.DATABASE_URL
  ```

### Helmet (`helmet.ts`)

Adds security headers to HTTP responses.

- **Package**: `@fastify/helmet`
- **Features**:
  - XSS Protection
  - Content Security Policy
  - Prevention of clickjacking
  - And other security headers

### Multipart (`multipart.ts`)

Enables parsing of multipart/form-data requests for file uploads.

- **Package**: `@fastify/multipart`
- **Configuration**:
  - Max file size: 1MB
  - Max fields: 10
  - Max files: 1

### Rate Limit (`rate-limit.ts`)

Limits the number of requests from a single IP address.

- **Package**: `@fastify/rate-limit`
- **Configuration**:
  - Max requests: 2000 per minute
- **Environment Variables**:
  - `RATE_LIMIT_MAX`: Maximum number of requests per time window

### Redis (Commented Out) (`redis.ts`)

Provides Redis connection for caching and session storage.

- **Package**: `@fastify/redis`
- **Environment Variables**:
  - `REDIS_HOST`: Redis server host
  - `REDIS_PORT`: Redis server port
  - `REDIS_PASSWORD`: Redis server password

### Scheduler (`scheduler.ts`)

Enables scheduling of tasks and jobs.

- **Package**: `@fastify/schedule`
- **Dependencies**:
  - Used by the custom `tasks.ts` plugin

### Sensible (`sensible.ts`)

Adds useful utilities for HTTP error handling.

- **Package**: `@fastify/sensible`
- **Features**:
  - HTTP errors with proper status codes
  - Utility functions for common operations

### Static File Serving (`static.ts`)

Serves static files from a directory.

- **Package**: `@fastify/static`
- **Configuration**:
  - Root directory: `uploads` (configurable)
  - URL prefix: `/uploads` (configurable)
- **Environment Variables**:
  - `UPLOAD_DIRNAME`: Directory name for uploads
  - `UPLOAD_TASKS_DIRNAME`: Subdirectory for task-related uploads

### Under Pressure (`under-pressure.ts`)

Monitors server load and handles overload situations.

- **Package**: `@fastify/under-pressure`
- **Features**:
  - Monitors event loop delay
  - Monitors heap usage
  - Responds with 503 when server is overloaded
  - Health check endpoint

### WebSocket (`websocket.ts`)

Enables WebSocket support for real-time communication.

- **Package**: `@fastify/websocket`
- **Features**:
  - WebSocket server at `/ws` endpoint
  - Broadcast functionality to all connected clients
  - Max payload size: 1MB

## Plugin Loading Order

External plugins are loaded before custom plugins, providing core functionality that custom plugins can build upon. The loading is handled by `fastify-autoload` in the main application entry point.

## Resources

- [The hitchhiker's guide to plugins](https://fastify.dev/docs/latest/Guides/Plugins-Guide/)
- [Fastify decorators](https://fastify.dev/docs/latest/Reference/Decorators/)
- [Fastify lifecycle](https://fastify.dev/docs/latest/Reference/Lifecycle/)
