# 🗳️ Real-Time Poll Rooms

A full-stack web application that allows users to create polls, share them via a link, and collect votes with real-time updates across all viewers.

🔗 Live App:https://realtime-poll-app-gamma.vercel.app/
💻 GitHub Repo: https://github.com/akankshapandit/Realtime_Poll_App

---

## 📌 Objective

Build a web app that lets someone create a poll, share it via a link, and collect votes while results update in real time for all viewers.

This project satisfies all required features including real-time updates, persistence, anti-abuse controls, and public deployment.

---

## 🚀 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router
- Axios
- Socket.IO Client

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Socket.IO
- CORS

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## ✅ Features Implemented

### 1️⃣ Poll Creation
- Users can create a poll with a question and at least 2 options.
- Additional options can be added dynamically.
- A unique shareable link is generated after creation.

---

### 2️⃣ Join by Link
- Anyone with the link can access the poll.
- Users can vote for one option (single-choice).
- The poll loads dynamically based on the unique poll ID.

---

### 3️⃣ Real-Time Results
- Implemented using Socket.IO.
- When one user votes:
  - All other users viewing the same poll see results update instantly.
  - No page refresh required.

---

### 4️⃣ Fairness / Anti-Abuse Mechanisms

The application implements **two mechanisms** to reduce abusive voting:

#### 🔒 1. IP-Based Restriction (Backend Level)
- Each vote records the request IP address.
- The same IP cannot vote multiple times for the same poll.

**Prevents:**  
Repeated voting from the same network.

**Limitation:**  
Users using VPNs or different networks may bypass this.

---

#### 🖥️ 2. LocalStorage Tracking (Frontend Level)
- After voting, a flag is stored in browser localStorage.
- Prevents voting again even after page refresh.

**Prevents:**  
Accidental repeat voting from the same browser.

**Limitation:**  
Clearing browser storage removes restriction.

---

### 5️⃣ Persistence
- All polls and votes are stored in MongoDB Atlas.
- Refreshing the page does NOT remove votes.
- Share links remain valid even after:
  - Browser restart
  - Server restart
  - New device access

---

### 6️⃣ Deployment
- Publicly accessible frontend URL hosted on Vercel.
- Backend API hosted on Render.
- MongoDB Atlas for persistent cloud storage.

---

## ⚠️ Edge Cases Handled

- Empty poll question
- Less than 2 options
- Blank options
- Invalid poll ID
- Voting more than once
- Network/server errors
- Poll not found
- Real-time disconnection handling

---

## 🧠 Known Limitations

- No user authentication system
- No poll expiration feature
- IP restriction may not prevent VPN-based voting
- No analytics dashboard
- No CAPTCHA protection

---

## 🔮 Future Improvements

- User authentication & accounts
- Poll expiry settings
- CAPTCHA verification
- Admin dashboard
- Poll analytics
- Rate limiting middleware
- Improved abuse detection

---

## 🛠️ Local Setup Instructions

### Backend
cd backend
npm install
node server.js

Environment Variables:
PORT=5000
MONGO_URI=mongodb+srv://akpandit:yHmOFhvZAQYWA9rC@realtimeapp.r3qmb6u.mongodb.net/?appName=realtimeApp

### Frontend
cd frontend
npm install
npm run dev


## 🏁 Final Result

✔ Poll creation  
✔ Shareable link  
✔ Real-time voting  
✔ Persistence  
✔ Anti-abuse controls  
✔ Public deployment  

This project fulfills all required features specified in the assignment.
