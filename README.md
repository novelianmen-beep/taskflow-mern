# TaskFlow — MERN Kanban Task Manager

A full-stack task management application built using the MERN stack. TaskFlow allows users to organize their work through an interactive Kanban board with secure authentication and task management features.

## Features

- Secure user registration and login using JWT authentication.
- Password hashing with bcryptjs.
- Protected routes and user-specific task access.
- Create, edit and delete tasks.
- Drag-and-drop task management across three columns:
  - To Do
  - In Progress
  - Done
- Task priorities and due dates.
- Search and priority filtering.
- Optimistic UI updates with automatic rollback on errors.
- Responsive interface for mobile and desktop.

## Tech Stack

| Layer            | Technologies                        |
| ---------------- | ----------------------------------- |
| Frontend         | React 18, Vite, React Router, Axios |
| State Management | React Context API                   |
| Backend          | Node.js, Express.js                 |
| Database         | MongoDB, Mongoose                   |
| Authentication   | JWT, bcryptjs                       |
| Version Control  | Git, GitHub                         |

## Project Structure

```text
kanban-mern/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm
- MongoDB Atlas account or a local MongoDB instance
- Git

### 1. Clone the repository

```bash
git clone https://github.com/novelianmen-beep/taskflow-mern.git
cd taskflow-mern
```

### 2. Configure the backend

```bash
cd server
npm install
```

Copy `.env.example` to `.env` and configure your environment variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_random_secret
CLIENT_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

Backend runs at `http://localhost:5000`.

### 3. Configure the frontend

Open a second terminal:

```bash
cd client
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`.

Make sure the frontend API configuration points to your running backend.

## API Reference

| Method | Endpoint             | Description         | Authentication |
| ------ | -------------------- | ------------------- | -------------- |
| POST   | `/api/auth/register` | Register a new user | No             |
| POST   | `/api/auth/login`    | Log in              | No             |
| GET    | `/api/auth/me`       | Get current user    | Yes            |
| GET    | `/api/tasks`         | Retrieve user tasks | Yes            |
| POST   | `/api/tasks`         | Create a task       | Yes            |
| PUT    | `/api/tasks/:id`     | Update a task       | Yes            |
| DELETE | `/api/tasks/:id`     | Delete a task       | Yes            |

## Deployment

Deployment is planned.

Potential deployment services:

- **Database:** MongoDB Atlas
- **Backend:** Render or Railway
- **Frontend:** Vercel or Netlify

Production environment variables and frontend API configuration must be updated before deployment.

## Future Improvements

- Reorder tasks within columns.
- Multiple boards and team collaboration.
- Task comments and labels.
- Automated testing with Jest and Supertest.

## Author

**Saadi**

GitHub: [@novelianmen-beep](https://github.com/novelianmen-beep)
