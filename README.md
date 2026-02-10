# UnlashAPI Project

A full-stack web application combining real-time chat, image search, and user authentication.

## Project Overview

This is a MERN-style stack application (Express.js, React, PostgreSQL) that provides:

- User registration and authentication
- Real-time chat functionality using WebSockets
- Image search integration with Unsplash API
- Google OAuth authentication

## Tech Stack

### Backend (Server)

- **Framework**: Express.js
- **Real-time Communication**: Socket.io (WebSocket)
- **Authentication**: Passport.js
- **Database**: PostgreSQL
- **Runtime**: Node.js (ES Modules)
- **Middleware**: CORS, Body Parser

### Frontend (Client)

- **Library**: React 19
- **Build Tool**: Vite
- **Routing**: React Router v7
- **Authentication**: Google OAuth, JWT
- **Styling**: CSS

## Project Structure

```
unlashapi-project/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── App.jsx        # Main app component
│   │   ├── chat.jsx       # Chat feature
│   │   ├── registration.jsx # User registration
│   │   ├── search.jsx     # Image search
│   │   ├── main.jsx       # React entry point
│   │   └── assets/        # Static assets
│   ├── index.html
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── package.json
│
└── server/                 # Express backend application
    ├── server.js          # Main server file
    ├── auth.js            # Authentication routes
    ├── chat.js            # Chat/WebSocket setup
    ├── search.js          # Search API routes
    ├── home.js            # Home routes
    └── package.json
```

## Features

### 1. User Authentication

- User registration with email and password
- Passport.js local authentication
- Google OAuth integration
- JWT token support

### 2. Image Search

- Integration with Unsplash API
- Search photos by query
- RESTful API endpoint at `/api/search`

### 3. Real-time Chat

- WebSocket-based communication using Socket.io
- Real-time message exchange between users

### 4. Frontend Navigation

- Multi-page routing with React Router
- Registration page
- Search page
- Chat interface

## Installation & Setup

### Prerequisites

- Node.js (v18+)
- npm or yarn
- PostgreSQL database
- Unsplash API key
- Google OAuth credentials (optional)

### Backend Setup

1. Navigate to server directory:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
DB_USER=your_db_user
DB_HOST=localhost
DB_DATABASE=your_db_name
DB_PASSWORD=your_db_password
DB_PORT=5432
API_KEY=your_unsplash_api_key
```

4. Start the server:

```bash
npm start          # Production
npm run dev        # Development with watch mode
```

The server will run on **http://localhost:3000**

### Frontend Setup

1. Navigate to client directory:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The client will run on **http://localhost:5173**

## API Endpoints

### Authentication Routes

- `POST /auth/registration` - Register a new user
- `GET /auth/login` - Login with Passport authentication

### Search Routes

- `POST /api/search` - Search for images (requires `searchQuery` in body)

### Home Routes

- Routes defined in `home.js`

### WebSocket Events (Chat)

- Socket.io connection handling defined in `chat.js`

## Available Scripts

### Client

```bash
npm run dev      # Start Vite dev server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

### Server

```bash
npm start        # Start server
npm run dev      # Start with watch mode
```

## Environment Variables

Create a `.env` file in the root project directory with:

```
DB_USER=         # PostgreSQL user
DB_HOST=         # PostgreSQL host
DB_DATABASE=     # PostgreSQL database name
DB_PASSWORD=     # PostgreSQL password
DB_PORT=         # PostgreSQL port (default: 5432)
API_KEY=         # Unsplash API key
```

## CORS Configuration

The server is configured to accept requests from:

- `http://localhost:5173` (Vite dev server)

This can be modified in [server/server.js](server/server.js)

## Development Workflow

1. Start PostgreSQL database
2. Run the backend server: `cd server && npm run dev`
3. In another terminal, run the frontend: `cd client && npm run dev`
4. Open browser to `http://localhost:5173`

## Dependencies

### Server Dependencies

- `express` - Web framework
- `socket.io` - Real-time WebSocket communication
- `passport` - Authentication middleware
- `pg` - PostgreSQL client
- `cors` - CORS middleware
- `body-parser` - Request body parsing
- `dotenv` - Environment variables

### Client Dependencies

- `react` - UI library
- `react-dom` - React DOM rendering
- `react-router-dom` - Client-side routing
- `@react-oauth/google` - Google OAuth integration
- `jwt-decode` - JWT token decoding

## Next Steps

- Set up PostgreSQL database schema
- Configure Google OAuth credentials
- Implement complete chat functionality
- Add error handling and validation
- Deploy to production

## License

ISC

## Notes

- Ensure database connection is established before starting the server
- Update CORS origin if deploying to production
- Generate OAuth credentials from Google Cloud Console for authentication
- API keys should never be committed to version control
