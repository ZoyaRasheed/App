# Express Modular Backend

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/manishdashsharma/express-modular-backend/blob/main/LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/manishdashsharma/express-modular-backend/pulls)

A production-ready, modular monolith backend template built with Node.js and Express. Features multi-database support (PostgreSQL, Redis, MongoDB), comprehensive health monitoring, structured logging, and optional third-party integrations.

## Why This Template?

- **Modular Architecture**: Clean module pattern with template for rapid feature development
- **Multi-Database Support**: PostgreSQL (Prisma), MongoDB (Mongoose), Redis out of the box
- **Production Ready**: Health monitoring, Winston logging, error handling, rate limiting, security headers
- **Developer Experience**: Hot reload, ESLint, Prettier, conventional commits ready
- **Scalable**: Read/write DB separation, Redis cluster support, organized folder structure
- **Flexible**: Optional third-party integrations (Stripe, AWS S3, Twilio, Nodemailer)

## Quick Start

### Prerequisites

- **Node.js** >= 18.0.0
- **PostgreSQL** >= 13 (required)
- **Redis** >= 6 (optional but recommended)
- **MongoDB** >= 5 (optional)

### Installation

1. **Use this template or clone the repository**
   ```bash
   git clone https://github.com/manishdashsharma/express-modular-backend.git my-project
   cd my-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials and secrets
   ```

4. **Setup database**
   ```bash
   npm run db:generate  # Generate Prisma client
   npm run db:migrate   # Run database migrations
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Verify installation**
   - API: http://localhost:3000
   - Health Check: http://localhost:3000/v1/health

## Project Structure

```
├── src/
│   ├── app.js              # Express app configuration
│   ├── server.js           # Server startup and shutdown
│   ├── config/             # Configuration files
│   │   ├── index.js        # Environment config
│   │   ├── databases.js    # Database connections
│   │   └── redis.js        # Redis configuration
│   ├── modules/            # Feature modules
│   │   ├── _template/      # Module template for new features
│   │   └── health/         # Health check module (example)
│   ├── router/             # Route registry
│   ├── shared/             # Shared utilities
│   │   ├── constant/       # Application constants
│   │   ├── middleware/     # Express middleware
│   │   └── utils/          # Helper functions (logger, response)
│   ├── models/             # Mongoose models
│   └── jobs/               # Background jobs (Bull)
├── prisma/
│   └── schema.prisma       # Prisma schema
├── logs/                   # Application logs
└── scripts/                # Utility scripts
```

## Customizing for Your Project

### 1. Rename the Project

Update these files with your project name:
- `package.json` - name, description, author, repository
- `package-lock.json` - name (or regenerate with `npm install`)
- `src/app.js` - welcome message (line 103-113)
- `src/server.js` - startup log message (line 12)

**Or use the init script:**
```bash
npm run init
```

### 2. Update Security Defaults

**CRITICAL**: Change these before deploying:
- `.env` - `JWT_SECRET` and `JWT_REFRESH_SECRET`
- `.env` - `RESPONSE_ENCRYPTION_KEY` (must be 32 characters)
- `src/config/index.js` - Review all default values

### 3. Configure Databases

**Required:**
- PostgreSQL: Set `DATABASE_URL` in `.env`

**Optional:**
- MongoDB: Set `MONGODB_URL` if using MongoDB features
- Redis: Set `REDIS_CLUSTER_URLS` for caching/sessions
- Read Replica: Set `DATABASE_READ_URL` for read scaling

### 4. Enable Optional Integrations

The template includes configurations for optional services. Uncomment and configure as needed:

**Stripe** (Payments)
```bash
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

**AWS S3** (File Storage)
```bash
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket
```

**Twilio** (SMS/Voice)
```bash
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
```

**Email** (SMTP)
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-password
```

## Creating New Modules

The template includes a module template at `src/modules/_template/`. Copy it to create new features:

```bash
# Example: Create a "users" module
cp -r src/modules/_template src/modules/users
```

Then update:
1. **Controllers** (`controllers/example.controller.js`) - Business logic
2. **Routes** (`routes/example.route.js`) - API endpoints
3. **Validations** (`validations/example.schema.js`) - Zod schemas
4. **Services** (`services/example.service.js`) - Database operations
5. **Index** (`index.js`) - Export module components
6. **Router** (`src/router/index.js`) - Register routes

### Module Structure Pattern

```javascript
// src/modules/users/
├── controllers/        # Request handlers
│   └── user.controller.js
├── routes/            # Route definitions
│   └── user.route.js
├── services/          # Business logic
│   └── user.service.js
├── validations/       # Input validation
│   └── user.schema.js
└── index.js          # Module exports
```

## Architecture Patterns

### Multi-Database Strategy

- **PostgreSQL (Prisma)**: Primary relational data, transactions
- **MongoDB (Mongoose)**: Document storage, logs, unstructured data
- **Redis**: Caching, sessions, rate limiting, queues

### Health Monitoring

The health module provides multiple endpoints:
- `/v1/health` - Basic health check
- `/v1/health/detailed` - Full system health with DB status
- `/v1/health/ready` - Kubernetes readiness probe
- `/v1/health/live` - Kubernetes liveness probe
- `/v1/health/database` - Database health details
- `/v1/health/status` - System status tracking

### Error Handling

Centralized error handling with:
- Async error wrapper (`asyncHandler`)
- Custom error classes (`AppError`)
- Structured error responses
- Request ID tracking

### Logging

Winston-based logging with multiple levels:
- `logger.info()` - General information
- `logger.error()` - Error messages
- `logger.security()` - Security events
- `logger.request()` - HTTP requests
- `logger.startup()` - Application startup

## Available Scripts

```bash
npm run init             # Interactive project initialization
npm run dev              # Start development server (with hot reload)
npm start                # Start production server
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run format           # Format code with Prettier
npm run db:generate      # Generate Prisma client
npm run db:migrate       # Run database migrations
npm run db:migrate:deploy # Deploy migrations (production)
npm run db:studio        # Open Prisma Studio (DB GUI)
npm run setup            # Full setup (install + generate + migrate)
```

## Environment Variables Reference

See `.env.example` for complete list. Key variables:

### Core (Required)
- `NODE_ENV` - Environment (development/staging/production)
- `PORT` - Server port (default: 3000)
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - JWT signing secret

### Databases (Optional)
- `DATABASE_READ_URL` - Read replica connection
- `MONGODB_URL` - MongoDB connection string
- `REDIS_CLUSTER_URLS` - Comma-separated Redis URLs

### Security
- `JWT_REFRESH_SECRET` - Refresh token secret
- `RESPONSE_ENCRYPTION_KEY` - Response encryption key (32 chars)
- `BCRYPT_ROUNDS` - Password hashing rounds (default: 12)

### Rate Limiting
- `RATE_LIMIT_WINDOW_MS` - Time window (default: 15min)
- `RATE_LIMIT_MAX_REQUESTS` - Max requests per window (default: 100)

### CORS
- `CORS_ORIGIN` - Allowed origins (comma-separated)

## Production Deployment

### Database Setup

1. Run migrations:
   ```bash
   npm run db:migrate:deploy
   ```

2. Configure read replicas (optional):
   ```bash
   DATABASE_READ_URL=postgresql://...
   ```

### Security Checklist

- [ ] Change all default secrets in `.env`
- [ ] Update `CORS_ORIGIN` with actual frontend URLs
- [ ] Set secure `JWT_SECRET` (minimum 32 characters)
- [ ] Configure rate limiting for your use case
- [ ] Review Helmet CSP settings in `src/app.js`
- [ ] Enable HTTPS/TLS on production server
- [ ] Set `NODE_ENV=production`

### Health Monitoring

Configure your monitoring system to check:
- Liveness: `GET /v1/health/live`
- Readiness: `GET /v1/health/ready`
- Full Health: `GET /v1/health/detailed`

### Kubernetes Example

```yaml
livenessProbe:
  httpGet:
    path: /v1/health/live
    port: 3000
  initialDelaySeconds: 30
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /v1/health/ready
    port: 3000
  initialDelaySeconds: 5
  periodSeconds: 5
```

## Tech Stack

### Core
- **Node.js** >= 18.0.0
- **Express** 5.1.0 - Web framework
- **Prisma** - PostgreSQL ORM with type safety
- **Mongoose** - MongoDB ODM
- **IORedis** - Redis client with cluster support

### Security & Middleware
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **express-rate-limit** - Rate limiting
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication

### Development
- **nodemon** - Hot reload
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Winston** - Structured logging

### Optional Integrations
- **Stripe** - Payment processing
- **AWS SDK** - S3 file storage
- **Twilio** - SMS/voice communication
- **Nodemailer** - Email sending
- **Bull** - Job queues
- **Socket.io** - WebSocket support

## Troubleshooting

### Database Connection Issues

```bash
# Check PostgreSQL is running
psql -h localhost -U your_user -d your_db

# Verify connection string format
postgresql://username:password@host:port/database
```

### Port Already in Use

```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

### Prisma Client Not Generated

```bash
npm run db:generate
```

## CI/CD Pipeline

The template includes a production-ready GitHub Actions workflow (`.github/workflows/deploy.yml`) for continuous integration and deployment.

### Workflow Overview

The CI/CD pipeline automatically runs on pushes and pull requests to `main`, `staging`, and `dev` branches.

### Pipeline Jobs

**1. Test Job** (runs for all branches)
- Sets up PostgreSQL and Redis test databases
- Installs dependencies
- Generates Prisma client
- Runs database migrations
- Executes ESLint
- Runs tests (if available)
- Validates build

**2. Environment Deployments**
- **Development** (`dev` branch) - Deploys to development environment
- **Staging** (`staging` branch) - Deploys to staging environment
- **Production** (`main` branch) - Deploys to production environment with extra care

**3. Security Scan**
- Runs `npm audit` for dependency vulnerabilities
- Scans codebase for potential secrets
- Reports security issues

**4. Database Check**
- Validates Prisma schema
- Ensures database migrations are correct
- Checks for schema issues

**5. Workflow Summary**
- Reports overall pipeline status
- Aggregates all job results

### Branch Strategy

```
main (production)     ←  Merge from staging after QA
  ↑
staging               ←  Merge from dev for testing
  ↑
dev                   ←  Active development
```

### Customizing Deployments

Edit `.github/workflows/deploy.yml` to add your actual deployment commands:

```yaml
- name: Deploy to Production
  run: |
    # Replace with your deployment commands
    # Examples:
    # - SSH: ssh user@server 'cd /app && git pull && npm install && pm2 restart app'
    # - Docker: docker build -t myapp . && docker push myapp
    # - Cloud: gcloud app deploy
    # - Heroku: git push heroku main
```

### Adding Notifications

Uncomment and configure notification steps in the workflow:

**Slack Notifications:**
1. Create a Slack webhook: https://api.slack.com/messaging/webhooks
2. Add `SLACK_WEBHOOK_URL` to GitHub Secrets
3. Uncomment Slack notification steps in the workflow

**Discord/Email:**
Add similar notification steps using respective actions from GitHub Marketplace.

### Required GitHub Secrets

For the workflow to function properly, add these secrets in GitHub Settings > Secrets:

- Database credentials (if deploying to cloud)
- Cloud provider credentials (AWS, GCP, Azure, etc.)
- Notification webhook URLs
- SSH keys for server deployment

### Monitoring Pipeline

View pipeline status:
- GitHub repository → Actions tab
- Status badges (add to README):
  ```markdown
  ![CI/CD](https://github.com/manishdashsharma/express-modular-backend/workflows/CI%2FCD%20Pipeline/badge.svg)
  ```

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## Documentation

- **[QUICK_START.md](docs/QUICK_START.md)** - 5-minute quick start guide
- **[TEMPLATE_GUIDE.md](docs/TEMPLATE_GUIDE.md)** - Comprehensive template usage
- **[DEPENDENCIES.md](docs/DEPENDENCIES.md)** - Dependency management
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contribution guidelines

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- Documentation: [GitHub Wiki](https://github.com/manishdashsharma/express-modular-backend/wiki)
- Issues: [GitHub Issues](https://github.com/manishdashsharma/express-modular-backend/issues)
- Discussions: [GitHub Discussions](https://github.com/manishdashsharma/express-modular-backend/discussions)

## Acknowledgments

Built with best practices from:
- Express.js documentation
- Prisma best practices
- Node.js production patterns
- Modular monolith architecture principles

---

**Built for developers who want to start fast and scale smart.**
