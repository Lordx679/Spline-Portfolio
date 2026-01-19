# replit.md

## Overview

This is a personal portfolio website for a Discord and web developer. The application is a full-stack TypeScript project featuring a React frontend with 3D Spline scenes, smooth Framer Motion animations, and a Node.js/Express backend with PostgreSQL database. The site includes Home, About, and Contact pages with a contact form that stores messages in the database.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, bundled using Vite
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state and data fetching
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming (dark theme by default)
- **Animations**: Framer Motion for page transitions and micro-interactions
- **3D Graphics**: Spline (@splinetool/react-spline) for interactive 3D scenes
- **Forms**: React Hook Form with Zod validation via @hookform/resolvers

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript, compiled with tsx for development and esbuild for production
- **API Pattern**: RESTful endpoints defined in `shared/routes.ts` with Zod schemas for type-safe request/response validation
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Development Server**: Vite middleware integration for HMR during development

### Data Storage
- **Database**: PostgreSQL accessed via `DATABASE_URL` environment variable
- **Schema Location**: `shared/schema.ts` defines tables using Drizzle's schema builder
- **Migrations**: Drizzle Kit for schema migrations (output to `./migrations`)
- **Current Schema**: Single `messages` table for contact form submissions

### Project Structure
```
client/           # Frontend React application
  src/
    components/   # React components including Shadcn UI
    pages/        # Route page components
    hooks/        # Custom React hooks
    lib/          # Utilities and query client
server/           # Backend Express application
  index.ts        # Server entry point
  routes.ts       # API route definitions
  storage.ts      # Database operations layer
  db.ts           # Database connection
shared/           # Shared code between frontend/backend
  schema.ts       # Drizzle database schema
  routes.ts       # API route contracts with Zod schemas
```

### API Design
Routes are defined declaratively in `shared/routes.ts` with:
- HTTP method and path
- Input schema (Zod validation)
- Response schemas by status code

This enables type-safe API contracts shared between client and server.

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Database queries and schema management

### Third-Party Services
- **Spline**: 3D scene hosting and rendering (scenes loaded from `prod.spline.design`)
- **Google Fonts**: Custom typography (Space Grotesk, Outfit, JetBrains Mono)

### Key npm Packages
- **UI**: Radix UI primitives, Shadcn components, Lucide icons, react-icons
- **Animation**: Framer Motion
- **Forms**: React Hook Form, Zod
- **Data Fetching**: TanStack React Query
- **Routing**: Wouter
- **Build Tools**: Vite, esbuild, tsx