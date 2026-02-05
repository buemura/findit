# FindIt - Freelance Marketplace

A modern freelance marketplace platform for finding and posting project opportunities.

## Tech Stack

### Backend (`/apps/api`)
- **Framework**: NestJS with Fastify adapter
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: JWT with refresh tokens
- **Real-time**: Socket.io for chat
- **Documentation**: Swagger/OpenAPI

### Frontend (`/apps/web`)
- **Framework**: Next.js 14 (App Router)
- **Styling**: TailwindCSS
- **State Management**: React Context
- **Real-time**: Socket.io client

## Features

- **Authentication**: Register, login, JWT refresh tokens
- **User Management**: Profile, portfolio, stats
- **Categories**: Admin-managed opportunity categories
- **Opportunities**: CRUD with advanced filtering
  - Filter by location, category, price range
  - Filter by poster rating and completed jobs
  - Sort by date or price
- **Chat**: Real-time messaging via WebSocket
  - Direct user-to-user chat
  - Opportunity-specific chat rooms
- **Feedback**: User ratings and reviews

## Prerequisites

- Node.js 18+
- PostgreSQL 16+
- pnpm (recommended) or npm

## Getting Started

### 1. Clone and Install

```bash
# Install dependencies for API
cd apps/api
pnpm install

# Install dependencies for Web
cd ../web
pnpm install
```

### 2. Configure Environment

```bash
# API configuration
cd apps/api
cp .env .env.local
# Edit .env with your database credentials

# Web configuration (already set up for localhost)
cd ../web
# .env.local is pre-configured
```

### 3. Setup Database

```bash
cd apps/api

# Generate migrations
pnpm db:generate

# Apply migrations
pnpm db:migrate

# Seed initial data (categories + admin user)
pnpm db:seed
```

### 4. Run Development Servers

```bash
# Terminal 1: API (runs on port 3001)
cd apps/api
pnpm start:dev

# Terminal 2: Web (runs on port 3000)
cd apps/web
pnpm dev
```

### 5. Access the Application

- **Frontend**: http://localhost:3000
- **API**: http://localhost:3001/api
- **Swagger Docs**: http://localhost:3001/api-docs

### Default Admin User

After seeding, you can login with:
- Email: `admin@findit.com`
- Password: `admin123`

## Project Structure

```
findit/
├── apps/
│   ├── api/                    # NestJS Backend
│   │   ├── src/
│   │   │   ├── common/         # Shared utilities
│   │   │   ├── config/         # Configuration
│   │   │   ├── infrastructure/ # Database, storage
│   │   │   └── modules/        # Feature modules
│   │   │       ├── auth/
│   │   │       ├── users/
│   │   │       ├── categories/
│   │   │       ├── opportunities/
│   │   │       ├── portfolio/
│   │   │       ├── chat/
│   │   │       └── feedback/
│   │   └── drizzle/            # Migrations
│   │
│   └── web/                    # Next.js Frontend
│       └── src/
│           ├── app/            # App Router pages
│           ├── components/     # React components
│           ├── context/        # Auth context
│           ├── lib/            # API clients, utilities
│           └── types/          # TypeScript types
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users/:id` - Get user
- `PATCH /api/users/me` - Update profile
- `GET /api/users/:id/stats` - Get user stats

### Categories
- `GET /api/categories` - List categories
- `POST /api/categories` - Create (admin)

### Opportunities
- `GET /api/opportunities` - List with filters
- `GET /api/opportunities/:id` - Get details
- `POST /api/opportunities` - Create
- `PATCH /api/opportunities/:id` - Update
- `PATCH /api/opportunities/:id/complete` - Mark completed
- `DELETE /api/opportunities/:id` - Soft delete

### Portfolio
- `GET /api/users/:id/portfolio` - Get portfolio
- `POST /api/portfolio` - Create item
- `PATCH /api/portfolio/:id` - Update
- `DELETE /api/portfolio/:id` - Delete

### Chat
- `GET /api/chat/rooms` - Get user's rooms
- `POST /api/chat/rooms` - Create room
- `GET /api/chat/rooms/:id/messages` - Get messages
- `POST /api/chat/rooms/:id/messages` - Send message

### Feedback
- `GET /api/users/:id/feedbacks` - Get feedbacks
- `GET /api/users/:id/rating` - Get average rating
- `POST /api/feedbacks` - Create feedback

## Scripts

### API (`apps/api`)
```bash
pnpm start:dev      # Development server
pnpm build          # Build for production
pnpm start:prod     # Production server
pnpm test           # Run unit tests
pnpm db:generate    # Generate migrations
pnpm db:migrate     # Apply migrations
pnpm db:push        # Push schema (dev only)
pnpm db:studio      # Open Drizzle Studio
pnpm db:seed        # Seed database
```

### Web (`apps/web`)
```bash
pnpm dev            # Development server
pnpm build          # Build for production
pnpm start          # Production server
pnpm lint           # Run linter
```

## Testing

```bash
cd apps/api
pnpm test           # Run all tests
pnpm test:watch     # Watch mode
pnpm test:cov       # Coverage report
```

## Authors

- Bruno Hideki Uemura
- José Lacerda Junior

## License

MIT
