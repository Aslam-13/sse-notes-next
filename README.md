# 📝 Full-Stack Note-Taking App

A secure and modern full-stack **Note-Taking Web App** built with:

- ⚡️ [Next.js (App Router)](https://nextjs.org/docs/app)
- 🌿 [MongoDB + Mongoose](https://mongoosejs.com/)
- 🔐 JWT Authentication with secure cookies
- 💨 Tailwind CSS for a clean, responsive UI

---

## 📦 Features

### ✅ Authentication
- User registration and login
- Secure password hashing (`bcrypt`)
- JWT-based auth via HTTP-only cookies
- Auth middleware to protect API routes

### 📝 Notes Management (CRUD)
- Create, view, update, and delete notes
- Notes are private and user-specific
- Notes contain title, content, and timestamps

### 💄 UI/UX
- Fully responsive with Tailwind CSS
- Reusable NoteCard component
- Error banners, loading indicators
- Inline editing, modals, and feedback

---

## 📁 Project Structure

.
```├── app/ # Next.js App Router (frontend & API routes)
│ ├── api/ # Auth and Notes API routes
│ ├── dashboard/ # Authenticated dashboard page
│ ├── login/ # Login page
│ ├── register/ # Registration page
│ ├── layout.jsx # App layout (Navbar, etc.)
│ └── page.jsx # Homepage
├── components/ # Reusable UI components (LoadingButton)
├── lib/ # Utilities: DB, JWT, auth middleware
├── models/ # Mongoose schemas
├── public/ # Static assets
├── styles/ # Global styles
├── .env.local # Environment variables
└── README.md```
 
---

## ⚙️ Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Aslam-13/sse-notes-next
cd sse-notes-next

2. Install Dependencies 
npm install

3. Setup Environment Variables
Create a .env.local file at the root:

MONGODB_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret

🚀 Run Locally
 
npm run dev
Visit http://localhost:3000

🔐 Authentication APIs
POST /api/auth/register
Registers a new user

✅ Request Body:
json
Copy
Edit
{
  "name": "John",
  "email": "john@example.com",
  "password": "123456"
}
Returns: Set-Cookie with JWT token

POST /api/auth/login
Logs in the user

✅ Request Body:
json
Copy
Edit
{
  "email": "john@example.com",
  "password": "123456"
}
Returns: Set-Cookie with JWT token

GET /api/auth/logout
Logs out the user by clearing the auth cookie.

📝 Notes APIs (Authenticated)
All requests must include a valid HTTP-only cookie with the JWT token.

GET /api/notes
Returns all notes for the logged-in user.

POST /api/notes
Creates a new note.

✅ Request Body:
json
Copy
Edit
{
  "title": "Meeting Notes",
  "content": "Discussed roadmap"
}
PUT /api/notes/:id
Updates a note.

✅ Request Body:
json
Copy
Edit
{
  "title": "Updated Title",
  "content": "Updated content"
}
DELETE /api/notes/:id
Deletes a note by its ID.

🧪 Validation & Security

Passwords hashed with bcrypt
JWT signed and verified with a secret
Middleware to protect routes
Error handling for:
Duplicate email
Invalid login
Unauthorized access
Note not found

🖼️ UI Screens
Register: /register
Login: /login

Dashboard: /dashboard (requires auth)
View, Add, Edit, Delete notes

✨ Tech Stack
Layer	Tools
Frontend	Next.js (App Router), Tailwind CSS
Backend	Next.js API Routes (Node.js)
Database	MongoDB (via Mongoose)
Auth	JWT + bcrypt, HTTP-only cookies
Styling	Tailwind CSS

📌 ## Future Improvements
Global toast notifications

Note pinning, color labels
Search & filter
Markdown editor
Dark mode toggle
Deployment on Vercel

👨‍💻 ## About This Project 

Full-stack NextJs framework
JWT authentication with secure handling
RESTful API design with Next.js App Router
MongoDB integration and schema modeling
Clean UI, responsive design, and error feedback

