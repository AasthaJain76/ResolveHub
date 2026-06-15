# ResolveHub 🏠

> A modern hostel complaint management and resolution portal for students and wardens.

**Live Demo:** [resolve-hub-nine.vercel.app](https://resolve-hub-nine.vercel.app)

---

## Overview

ResolveHub (HostelResolve) is a full-stack web application that streamlines the process of raising, tracking, and resolving hostel complaints. Students can submit grievances with supporting media, and wardens/admins can manage and update resolution status — all from a single unified platform.

---

## Features

- **Student Portal** — Submit complaints with descriptions and image attachments
- **Warden/Admin Dashboard** — View, assign, and update complaint status
- **Media Uploads** — Cloudinary integration for image evidence
- **Authentication** — JWT-based secure login for students and wardens
- **Real-time Status Tracking** — Track complaint progress from submission to resolution
- **Responsive UI** — Works seamlessly on desktop and mobile

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React (Vite), JavaScript, CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB (MongoDB Atlas) |
| Auth | JSON Web Tokens (JWT) |
| Media Storage | Cloudinary |
| Frontend Hosting | Vercel |
| Backend Hosting | Render |

---

## Project Structure

```
ResolveHub/
├── backend/          # Node.js + Express REST API
├── frontend/         # Vite + React frontend
├── render.yaml       # Render deployment config
├── package.json      # Root package config
└── .gitignore
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm
- MongoDB Atlas account
- Cloudinary account

### Environment Variables

Create a `.env` file in the `backend/` directory:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:5000
```

### Local Setup

```bash
# Clone the repository
git clone https://github.com/AasthaJain76/ResolveHub.git
cd ResolveHub

# Install root dependencies
npm install

# Install and run the backend
cd backend
npm install
npm start

# In a new terminal, install and run the frontend
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:5000`.

---

## Deployment

This project is configured for deployment on Render (backend) and Vercel (frontend) via `render.yaml`.

**Backend** deploys as a Node.js web service in the Singapore region.

**Frontend** deploys as a static site with SPA rewrite rules (`/*` → `/index.html`) and the `VITE_API_URL` pointed to the live backend.

To deploy on Render, connect your GitHub repository and Render will auto-detect `render.yaml`.

---

## Contributors

| Name | Role |
|------|------|
| [AasthaJain76](https://github.com/AasthaJain76) | Full-Stack Development |

---

## License

This project is open source. Feel free to fork and adapt it for your institution.
