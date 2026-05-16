# Smart Leads Dashboard

A full-stack Lead Management Dashboard built with the MERN stack and TypeScript.

## Features

- JWT Authentication (register/login)
- Role-Based Access Control (Admin / Sales)
- Lead CRUD — create, view, update, delete
- Advanced filtering by status, source, and search
- Debounced search
- Backend pagination (10 per page)
- CSV export (admin only)
- Responsive UI with loading skeletons and empty states
- Docker + docker-compose setup
- Seed script with realistic data

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React, TypeScript, Vite, TailwindCSS, TanStack Query, React Hook Form, Zod |
| Backend | Node.js, Express, TypeScript, MongoDB, Mongoose, JWT, bcrypt |
| Infra | Docker, docker-compose, MongoDB Atlas |

## RBAC

| Action | Admin | Sales |
|--------|-------|-------|
| View leads | ✅ | ✅ |
| Create lead | ✅ | ✅ |
| Update lead | ✅ | ✅ |
| Delete lead | ✅ | ❌ |
| Export CSV | ✅ | ❌ |

> Admin registration is intentionally disabled. Admins are seeded directly in the database to prevent privilege escalation.

## Local Setup

**Prerequisites:** Node.js, MongoDB Atlas account

### Backend
```bash
cd server
npm install
cp .env.example .env   # fill in your values
npm run dev
Seed database

npm run seed
# admin@example.com / Admin1234!
# sales@example.com / Sales1234!
Frontend

cd client
npm install
cp .env.example .env   # set VITE_API_URL
npm run dev
Open http://localhost:5173

Docker

docker-compose build
docker-compose up
Environment Variables
server/.env

PORT=5000
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
client/.env

VITE_API_URL=http://localhost:5000/api
API Reference
Method	Endpoint	Auth	Role	Description
POST	/api/auth/register	No	—	Register user
POST	/api/auth/login	No	—	Login
GET	/api/auth/me	Yes	Any	Get current user
GET	/api/leads	Yes	Any	List leads
POST	/api/leads	Yes	Any	Create lead
PATCH	/api/leads/:id	Yes	Any	Update lead
DELETE	/api/leads/:id	Yes	Admin	Delete lead
GET	/api/leads/export/csv	Yes	Admin	Export CSV


Create the file, then commit and push:

```powershell
git add README.md
git commit -m "docs: add project README"
git push