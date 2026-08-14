<img width="300" alt="DevGraph Homepage" src="https://github.com/user-attachments/assets/afaa965e-5e7a-4cf7-bd6d-409b3f4a53ed" />
<img width="300" alt="DevGraph Technology Graph" src="https://github.com/user-attachments/assets/c19983a0-3275-4dc8-98a4-c989b9ab3ed2" />
<img width="300" alt="DevGraph Explorer" src="https://github.com/user-attachments/assets/eb03805e-418d-4b2b-838b-e2dcf4e27a63" />

DevGraph

A graph-powered developer knowledge explorer built for the Wexa AI Software Engineer assessment.

DevGraph connects technologies, projects, skills, jobs, and learning resources using CognoDB and provides an interactive graph-based interface for exploring those relationships.

🚀 Live Demo

https://devgraph-blue.vercel.app/

📦 GitHub

https://github.com/AnkushMaurya07/devgraph

🏗️ Architecture

React + TypeScript
        ↓
Express + TypeScript
        ↓
CognoDB

✨ Features

Interactive technology graph

Technology, project, and job exploration

Global search

Related technology discovery

Project recommendations based on skills

Learning resources

REST API

Responsive UI

🛠️ Tech Stack

Frontend

React

TypeScript

Vite

Tailwind CSS

React Router

React Flow

Backend

Node.js

Express

TypeScript

REST API

Database

CognoDB

Cypher

Deployment

Vercel — Frontend

Render — Backend

🧠 Graph Model

Technology ──USED_WITH──────> Technology
Project ─────USES────────────> Technology
Project ─────DEMONSTRATES───> Skill
Job ─────────REQUIRES_TECH──> Technology
Job ─────────REQUIRES───────> Skill
Resource ────TEACHES────────> Technology

This allows users to explore relationships such as:

Technologies used in projects

Technologies commonly used together

Skills demonstrated by projects

Technologies and skills required by jobs

Projects matching job requirements

⚙️ Local Setup

git clone https://github.com/AnkushMaurya07/devgraph.git

cd devgraph/backend
npm install
npm run dev

Create backend/.env:

COGNODB_URI=
COGNODB_USERNAME=
COGNODB_PASSWORD=
PORT=5000

For the frontend:

cd ../frontend
npm install
npm run dev

Create frontend/.env:

VITE_API_URL=http://localhost:5000/api

🌐 Deployment

Frontend:
https://devgraph-blue.vercel.app/

Backend:
https://devgraph-4j1s.onrender.com/

👨‍💻 Author

Ankush Maurya

GitHub: https://github.com/AnkushMaurya07
