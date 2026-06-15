<div align="center">

# 🏢 ResolveHub

### *Bridging students and hostel authorities — one complaint at a time.*

**ResolveHub** is a full-stack hostel grievance and complaint management platform that enables students to raise, track, and review complaints while allowing hostel authorities to efficiently manage and resolve issues through a dedicated administrative portal.

![Developed By](https://img.shields.io/badge/Developed%20By-Aastha%20Jain-blueviolet?style=for-the-badge)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-resolve--hub--nine.vercel.app-6c5ce7?style=for-the-badge&logo=vercel)](https://resolve-hub-nine.vercel.app)
[![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61dafb?style=for-the-badge&logo=react)](https://github.com/AasthaJain76/ResolveHub)
[![Backend](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-43853d?style=for-the-badge&logo=node.js)](https://github.com/AasthaJain76/ResolveHub)
[![Database](https://img.shields.io/badge/Database-MongoDB%20Atlas-4EA94B?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/cloud/atlas)

</div>

---

## 📖 Table of Contents

- [About the Project](#about-the-project)
- [Key Highlights](#key-highlights)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Developer](#developer)

---

## 🏗️ About the Project

ResolveHub is a full-stack hostel grievance management platform developed independently by **Aastha Jain**. The system streamlines communication between students and hostel authorities by providing a transparent and efficient complaint resolution process.

Students can submit complaints with supporting evidence, track their progress, participate in discussions, and provide feedback after resolution. Hostel authorities can manage complaints, assign tasks, monitor performance metrics, publish notices, and handle escalations through a centralized dashboard.

The platform incorporates role-based authentication, cloud-based media management, automated escalation workflows, email notifications, and analytics to improve hostel administration and student satisfaction.

---

## 🎯 Key Highlights

- 🚀 Full-stack MERN-based application
- 🔐 Secure role-based authentication and authorization
- 📷 Cloudinary-powered image upload and storage
- ⏱️ Automated complaint escalation engine
- 📊 Dashboard analytics and complaint insights
- 💬 Real-time complaint discussions and commenting
- 👍 Community-driven complaint upvoting
- ⭐ Complaint feedback and rating mechanism
- 📢 Hostel-wide notice board system
- 🌐 Production deployment on Vercel and Render

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| React (Vite) | User Interface Development |
| JavaScript (ES6+) | Application Logic |
| React Router DOM | Client-Side Routing |
| CSS3 | Responsive Styling & Theming |

### Backend

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime Environment |
| Express.js | REST API Development |
| MongoDB | Database |
| Mongoose | Database Modeling |
| JWT | Authentication & Authorization |
| BcryptJS | Password Security |
| Multer | File Handling |
| Cloudinary | Cloud Media Storage |
| Node-Cron | Scheduled Background Jobs |
| Nodemailer | Email Notifications |

### Infrastructure

| Technology | Purpose |
|------------|---------|
| MongoDB Atlas | Cloud Database |
| Cloudinary | Media Storage |
| Render | Backend Hosting |
| Vercel | Frontend Deployment |

---

## ✨ Features

### 👨‍🎓 Student Portal

#### 🔐 Authentication
- Secure registration and login
- JWT-based authentication
- Protected routes and role management

#### 📝 Complaint Management
- Create complaints with detailed descriptions
- Categorize complaints by issue type
- Assign priority levels
- Upload image evidence

#### 👍 Community Engagement
- Upvote existing complaints
- Highlight common hostel issues
- Increase issue visibility

#### 💬 Interactive Discussions
- Comment on complaints
- Edit and delete personal comments
- Participate in resolution discussions

#### ⭐ Feedback System
- Rate complaint resolutions
- Submit feedback comments
- Reopen unresolved complaints

#### 🛡️ Spam Prevention
- Duplicate complaint protection
- Controlled submission intervals

---

### 🧑‍💼 Warden Portal

#### 📊 Dashboard Analytics
- Total complaints overview
- Pending complaint tracking
- In-progress complaint monitoring
- Resolution statistics
- Satisfaction rating analysis

#### ✅ Complaint Resolution
- Update complaint statuses
- Upload proof of resolution
- Manage complaint lifecycle

#### 🎫 Ticket Assignment
- Assign complaints to staff
- Track responsibility ownership
- Monitor task completion

#### 📢 Notice Management
- Create hostel announcements
- Upload notice images
- Manage campus-wide communication

---

### ⏱️ Automated Escalation Engine

The platform includes an automated escalation mechanism powered by Node-Cron.

Features include:

- Periodic complaint monitoring
- Automatic escalation of overdue complaints
- Email notifications to stakeholders
- Audit trail generation
- Escalation status tracking

This ensures that critical issues are not overlooked and receive timely attention.

---

## 🏛️ System Architecture

```text
┌─────────────────────────────────┐
│    Frontend (React + Vite)      │
└──────────────┬──────────────────┘
               │
         HTTP + JWT
               │
┌──────────────▼──────────────────┐
│     Backend (Node + Express)    │
├─────────────────────────────────┤
│ Authentication & Authorization  │
│ Complaint Management APIs       │
│ Notice Management APIs          │
│ Notification Services           │
│ Escalation Engine               │
└──────────────┬──────────────────┘
               │
       ┌───────▼────────┐
       │   MongoDB      │
       └────────────────┘

       ┌────────────────┐
       │  Cloudinary    │
       └────────────────┘

       ┌────────────────┐
       │ Email Services │
       └────────────────┘
```

---

## 📁 Project Structure

```text
ResolveHub/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── main.jsx
│   │
│   ├── index.html
│   └── vite.config.js
│
├── render.yaml
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Ensure the following are installed:

- Node.js (v16 or above)
- npm
- MongoDB Atlas Account
- Cloudinary Account
- Email Service Credentials

---

### Installation

#### Clone the Repository

```bash
git clone https://github.com/AasthaJain76/ResolveHub.git
cd ResolveHub
```

#### Install Dependencies

```bash
npm install
npm install --prefix backend
npm install --prefix frontend
```

#### Start Development Servers

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:5000
```

---

## 🔑 Environment Variables

### Backend (.env)

```env
PORT=5000
NODE_ENV=development

MONGO_URI=

JWT_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

EMAIL_HOST=
EMAIL_PORT=
EMAIL_USER=
EMAIL_PASS=
EMAIL_FROM=

APP_URL=http://localhost:5173

HIGHER_AUTHORITY_EMAIL=
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000
```

> ⚠️ Never commit `.env` files to version control.

---

## 🌐 Deployment

### Frontend

Deployed on:

```text
Vercel
```

### Backend

Deployed on:

```text
Render
```

### Live Application

🔗 https://resolve-hub-nine.vercel.app

---

### Connect

**GitHub:** https://github.com/AasthaJain76

---

<div align="center">

### Made with ❤️ by Aastha Jain

Empowering hostel grievance management through technology.

⭐ If you found this project interesting, consider giving it a star.

</div>
