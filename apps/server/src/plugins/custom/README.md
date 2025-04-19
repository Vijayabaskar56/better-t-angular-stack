# Custom Plugins

This directory contains custom plugins that extend Fastify's functionality with application-specific features. These plugins are loaded after the external plugins and can depend on them.

## Available Plugins

### Authentication (`auth.ts`)

A comprehensive authentication system built with better-auth.

- **Features**:
  - Email/password authentication
  - Email OTP verification
  - Two-factor authentication
  - Username-based authentication
  - Anonymous authentication
  - Admin functionality
  - User verification and re-verification
  - Account management (email change, account deletion)

- **Dependencies**:
  - MongoDB for user data storage
  - Email sending for verification

- **Usage**:
  ```typescript
  // Access auth functionality
  fastify.auth.api.getSession(...)
  ```

### Database Connection (`db.ts`)

Connects to MongoDB using Mongoose and provides database access throughout the application.

- **Features**:
  - MongoDB connection with Mongoose
  - Connection error handling
  - ObjectId validation helper

- **Environment Variables**:
  - `DATABASE_URL`: MongoDB connection string
  - `DATABASE_NAME`: Database name

- **Usage**:
  ```typescript
  // Access Mongoose connection
  fastify.mongoose
  
  // Convert string ID to ObjectId
  fastify.objectId('60d21b4667d0d8992e610c85')
  ```

### Email Sending (`send-email.ts`)

Provides email sending capabilities using Nodemailer with Handlebars templates.

- **Features**:
  - SMTP email sending
  - Handlebars template rendering
  - Configurable transport options

- **Environment Variables**:
  - `SMTP_HOST`: SMTP server host
  - `SMTP_PORT`: SMTP server port
  - `SMTP_USER`: SMTP username
  - `SMTP_PASS`: SMTP password

- **Usage**:
  ```typescript
  await fastify.sendEmail({
    email: 'user@example.com',
    subject: 'Welcome',
    template: 'welcome',
    context: { name: 'User' }
  })
  ```

### Event Emitter (`event-emitter.ts`)

Provides a Node.js EventEmitter for application-wide event handling.

- **Features**:
  - Singleton EventEmitter instance
  - Automatic cleanup on server shutdown
  - Configurable maximum listeners

- **Usage**:
  ```typescript
  // Emit an event
  fastify.emitter.emit('user:created', { id: '123' })
  
  // Listen for an event
  fastify.emitter.on('user:created', (user) => {
    // Handle event
  })
  ```

### Scheduled Tasks (`tasks.ts`)

Configures scheduled tasks using toad-scheduler.

- **Features**:
  - Interval-based job scheduling
  - Async task support
  - Error handling for tasks

- **Dependencies**:
  - `@fastify/schedule` plugin

- **Usage**:
  ```typescript
  // Tasks are configured in the plugin
  // Additional tasks can be added:
  const task = new AsyncTask(
    'task-name',
    async () => { /* task logic */ },
    (err) => { /* error handling */ }
  )
  
  const job = new SimpleIntervalJob({ minutes: 5 }, task)
  fastify.scheduler.addSimpleIntervalJob(job)
  ```

## Adding New Custom Plugins

To add a new custom plugin:

1. Create a new file in this directory
2. Export a default function that registers the plugin
3. Use `fastify-plugin` to prevent encapsulation if needed
4. Optionally export an `autoConfig` object or function for configuration

Example:

```typescript
import fp from 'fastify-plugin'
import type { FastifyInstance } from 'fastify'

export const autoConfig = {
  // Plugin configuration
}

export default fp(async function myPlugin(fastify: FastifyInstance, opts) {
  // Plugin implementation
  fastify.decorate('myFeature', () => {
    // Feature implementation
  })
})
```

## Plugin Loading Order

Custom plugins are loaded after external plugins, so they can depend on functionality provided by external plugins. The loading is handled by `fastify-autoload` in the main application entry point.
