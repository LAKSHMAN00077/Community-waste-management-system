# Community Waste Management System

A full-stack web application for reporting, tracking, and managing waste issues in the community with real-time updates and admin monitoring.

---

## 🔍 Problem Statement

Improper waste disposal and poor communication between citizens and authorities often lead to overflowing bins, health hazards, and delays in waste removal. This project addresses these issues by providing a platform where users can report waste incidents with location and image, and administrators can monitor and resolve them effectively.

---

## ✅ Features

### For Users
- Register and login securely
- Report waste with location and image
- View the status of submitted reports
- Delete account or update password

### For Admins
- View and manage all user reports
- Update report status (Pending, In-Progress, Resolved)
- Delete reports and users
- Reset user passwords
- View visual statistics with charts

---

## ⚙️ Technology Stack

| Layer         | Tech                             |
| ------------- | -------------------------------- |
| Frontend      | React.js, Tailwind CSS           |
| Backend       | Node.js, Express.js              |
| Database      | MongoDB                          |
| Auth          | JWT-based authentication         |
| Image Storage | Cloudinary                       |
| ML API        | Roboflow (Waste image detection) |

---

## 🧠 Smart Feature

### Waste Image Classification
- Integrated with Roboflow API to classify uploaded waste images (plastic, e-waste, etc.)
- Helps in automating category selection and data analytics

---

## 📂 Folder Structure

project-root/
├── backend/
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ ├── middleware/
│ ├── config/
│ └── index.js
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── context/
│ │ └── App.jsx
│ └── tailwind.config.js
│ ├── .env.example
├── README.md
└── .gitignore
