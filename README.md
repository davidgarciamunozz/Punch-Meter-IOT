# Punch Meter Application

A comprehensive Next.js application for measuring boxing punch strength, tracking user performance, and displaying leaderboards across multiple interfaces.

## Architecture Overview

### Frontend Architecture (Next.js)

The frontend application follows a modern React architecture using Next.js with the App Router for enhanced routing and server components:

- **Client Components**: Marked with "use client" directive for interactive UI elements
- **Server Components**: Used for data fetching and static rendering
- **Context API Pattern**: For global state management (auth, settings)
- **Component-Based Architecture**: Reusable UI components organized by feature
- **Responsive Design**: Tailwind CSS for responsive layouts across all device sizes

### Backend Architecture (Express.js)

The backend follows a REST API architecture built with Express.js:

- **MVC Pattern**: Separation of Models, Views (API responses), and Controllers
- **Middleware Pattern**: Authentication, validation, error handling
- **Repository Pattern**: Data access abstraction in database modules
- **Route-Controller-Service Structure**:
  - Routes: Define API endpoints
  - Controllers: Handle request/response logic
  - Services: Contain business logic

### Authentication Flow

- JWT-based authentication with token storage
- Protected routes with middleware verification
- Role-based access control (User vs Admin)

## Client Interfaces

### 1. User Client (Main Application)

Routes under `/dashboard/*`:

- **Dashboard Home** (`/dashboard`): Main user interface with navigation
- **Profile** (`/dashboard/profile`): User statistics and account information
- **Game Mode Selection** (`/dashboard/game-mode`): Choose game difficulty/type
- **Leaderboard** (`/dashboard/leaderboard`): View rankings among all users
- **QR Code** (`/dashboard/qr-id`): Display user's unique QR code for scanning by admin

Features:
- Personal performance tracking
- Historical punch data visualization
- Profile management
- Game mode selection
- Social interaction through leaderboards

### 2. Muppi Client (Public Display)

Routes under `/muppi/*`:

- **Leaderboard Display** (`/muppi`): Designed for large public displays showing top performers
- **QR Code** (`/muppi/qr`): Display QR code linking to the application for new users

Features:
- Large-format leaderboard designed for public viewing
- Attract mode animations and visual effects
- QR code for onboarding new users
- Real-time updates for live events

### 3. Admin Panel

Routes under `/admin/*`:

- **Admin Dashboard** (`/admin`): Overview and statistics
- **User Management** (`/admin/users`): List, search, and manage user accounts
- **QR Scanner** (`/admin/qr-scanner`): Scan user QR codes to initiate gameplay

Features:
- QR code scanning functionality to authenticate users for gameplay
- User management interface
- Performance monitoring and analytics
- System administration functions

## Technical Implementation

- **Authentication**: JWT-based auth with secure token storage
- **Data Storage**: JSON-based file storage for development, ready for SQL/NoSQL integration
- **Real-time Updates**: Socket-based communication for immediate leaderboard updates
- **Responsive Design**: Mobile-first approach supporting all device sizes
- **Progressive Enhancement**: Core functionality works without JavaScript, enhanced with client-side features

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Start the API server:
   ```bash
   npm run server
   ```

## Access Points

- **User Client**: http://localhost:3000/dashboard
- **Muppi Display**: http://localhost:3000/muppi  
- **Admin Panel**: http://localhost:3000/admin
  - Admin credentials:
    - Email: admin@punchmeter.com
    - Password: admin123
