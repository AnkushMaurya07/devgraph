<img width="935" height="458" alt="image" src="https://github.com/user-attachments/assets/afaa965e-5e7a-4cf7-bd6d-409b3f4a53ed" />
<img width="1528" height="830" alt="Recording 2026-08-14 141847" src="https://github.com/user-attachments/assets/c19983a0-3275-4dc8-98a4-c989b9ab3ed2" />
<img width="1892" height="938" alt="Recording 2026-08-14 142236" src="https://github.com/user-attachments/assets/eb03805e-418d-4b2b-838b-e2dcf4e27a63" />

<div align="center">

# 🚀 DevGraph

### Explore the connections between technologies, projects, skills, jobs, and resources.

A graph-powered developer knowledge explorer built with **React, TypeScript, Express, and CognoDB**.

<br />

<a href="https://devgraph-blue.vercel.app/">
  <strong>🌐 Live Demo</strong>
</a>
&nbsp;&nbsp;•&nbsp;&nbsp;
<a href="https://github.com/AnkushMaurya07/devgraph">
  <strong>📦 GitHub Repository</strong>
</a>

</div>

---

## 📸 Preview

<p align="center">
  <img width="300" alt="DevGraph Homepage" src="https://github.com/user-attachments/assets/afaa965e-5e7a-4cf7-bd6d-409b3f4a53ed" />
  <img width="300" alt="DevGraph Technology Graph" src="https://github.com/user-attachments/assets/c19983a0-3275-4dc8-98a4-c989b9ab3ed2" />
  <img width="300" alt="DevGraph Explorer" src="https://github.com/user-attachments/assets/eb03805e-418d-4b2b-838b-e2dcf4e27a63" />
</p>

---

## 🧠 What is DevGraph?

DevGraph is an interactive knowledge graph for developers.

Instead of viewing technologies, projects, skills, and jobs as isolated pieces of information, DevGraph connects them through meaningful relationships.

For example:

```text
React
  ├── Used With → TypeScript
  ├── Used With → Next.js
  ├── Used With → Redux Toolkit
  ├── Used In → Blog Platform
  └── Used In → E-commerce Platform

✨ Features
🔍 Global Search — Quickly find technologies, projects, and jobs
🕸️ Interactive Graph — Explore relationships visually
💻 Technology Explorer — Discover related technologies and projects
📁 Project Explorer — Explore technologies and skills used by projects
💼 Job Explorer — View required technologies and skills for different roles
🎯 Project Recommendations — Find projects matching job requirements
📚 Learning Resources — Discover resources connected to technologies
🔗 Graph Relationships — Navigate between connected entities
📱 Responsive UI — Works across desktop and mobile screens

🏗️ Architecture
┌──────────────────────────────┐
│       React + TypeScript     │
│          Vite + UI           │
└──────────────┬───────────────┘
               │
               │ REST API
               ▼
┌──────────────────────────────┐
│      Express + TypeScript    │
│        Backend Services      │
└──────────────┬───────────────┘
               │
               │ Cypher / Bolt
               ▼
┌──────────────────────────────┐
│           CognoDB            │
│        Graph Database        │
└──────────────────────────────┘

🕸️ Graph Model

DevGraph models the developer ecosystem using connected entities:

Technology ──USED_WITH──────> Technology


Project ─────USES────────────> Technology


Project ─────DEMONSTRATES───> Skill


Job ─────────REQUIRES_TECH──> Technology


Job ─────────REQUIRES───────> Skill


Resource ────TEACHES────────> Technology

This enables queries such as:

Which projects use React?
Which technologies are commonly used with React?
Which skills does a project demonstrate?
What technologies does a job require?
Which projects match a job's required skills?
What resources can help learn a technology?
🛠️ Tech Stack
Layer	Technologies
Frontend	React, TypeScript, Vite, Tailwind CSS, React Router, React Flow
Backend	Node.js, Express, TypeScript
Database	CognoDB, Cypher, Bolt
API	REST
Deployment	Vercel + Render
📂 Project Structure
devgraph/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── db/
│   │   ├── middleware/
│   │   ├── queries/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.ts
│   │
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   └── types/
│   │
│   └── package.json
│
└── README.md
⚙️ Getting Started
Prerequisites
Node.js 18+
npm
CognoDB instance
Clone the repository
git clone https://github.com/AnkushMaurya07/devgraph.git
cd devgraph
Backend
cd backend
npm install
npm run dev

Create backend/.env:

COGNODB_URI=
COGNODB_USERNAME=
COGNODB_PASSWORD=
PORT=5000
Frontend
cd ../frontend
npm install
npm run dev

Create frontend/.env:

VITE_API_URL=http://localhost:5000/api


🌐 Deployment
Frontend

Vercel

https://devgraph-blue.vercel.app/

Example API
GET /api/technologies

Live:

https://devgraph-4j1s.onrender.com/api/technologies

👨‍💻 Author
<div align="center">
Ankush Maurya

Frontend / Full-Stack Developer

<a href="https://github.com/AnkushMaurya07"> GitHub </a> </div>
