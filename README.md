# TaskFlow – Kanban Board (MERN)

A full-stack task management app. Users sign up, log in, and manage tasks on a drag-and-drop Kanban board. Built to practise the complete MERN stack.

## Features
- JWT authentication (register / login / protected routes)
- Passwords hashed with bcrypt
- Create, edit, delete tasks with priority and due date
- Drag and drop tasks between **To Do / In Progress / Done**
- Optimistic UI updates with automatic rollback on error
- Search and priority filter
- Each user can only access their own tasks
- Responsive layout (works on mobile)

## Tech Stack
| Layer | Tech |
|-------|------|
| Frontend | React 18, Vite, React Router, Axios, Context API |
| Backend | Node.js, Express |
| Database | MongoDB + Mongoose |
| Auth | JSON Web Tokens, bcryptjs |

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB running locally, or a free [MongoDB Atlas](https://www.mongodb.com/atlas) connection string

### 1. Backend
```bash
cd server
npm install
cp .env.example .env     # then edit MONGO_URI and JWT_SECRET
npm run dev
```
Runs on http://localhost:5000

### 2. Frontend
```bash
cd client
npm install
cp .env.example .env
npm run dev
```
Runs on http://localhost:5173

## API Reference
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Create account | No |
| POST | `/api/auth/login` | Log in, returns token | No |
| GET | `/api/auth/me` | Current user | Yes |
| GET | `/api/tasks` | List my tasks | Yes |
| POST | `/api/tasks` | Create task | Yes |
| PUT | `/api/tasks/:id` | Update / move task | Yes |
| DELETE | `/api/tasks/:id` | Delete task | Yes |

## Project Structure
```
kanban-mern/
├── server/
│   ├── config/db.js
│   ├── middleware/auth.js
│   ├── models/        (User, Task)
│   ├── routes/        (auth, tasks)
│   └── server.js
└── client/
    └── src/
        ├── components/  (Column, TaskCard, TaskModal)
        ├── context/     (AuthContext)
        ├── pages/       (AuthPage, Board)
        └── api.js
```

## Deployment
- **Database:** MongoDB Atlas (free tier)
- **Backend:** Render or Railway. Set `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`
- **Frontend:** Vercel or Netlify. Set `VITE_API_URL` to your backend URL + `/api`

## Ideas to Extend
- Reorder tasks within a column
- Multiple boards and team sharing
- Comments and labels
- Unit tests with Jest + Supertest
