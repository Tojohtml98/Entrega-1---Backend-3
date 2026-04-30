# 🚀 Backend API - Node.js / Express / MongoDB

REST API built with Node.js, Express and MongoDB, focused on backend fundamentals, clean architecture and real-world practices.

---

## 🚀 Live Demo

Swagger docs:
`https://<tu-servicio>.onrender.com/api/docs`

---

## ✨ Features

- Full CRUD operations (Users & Pets)
- Data generation and seeding (mock users/pets)
- MongoDB integration using Mongoose
- Data validation with Joi
- Error handling using middleware
- API documentation with Swagger
- Functional testing with Jest & Supertest
- Dockerized application

---

## 🧱 Architecture

- Controllers → handle request/response
- Services → business logic
- Models → MongoDB schemas
- Routes → API endpoints
- Utils → reusable helpers

---

## 🧠 What I demonstrate in this project

- REST API design
- Clean architecture (layer separation)
- Data validation with Joi
- Error handling middleware
- MongoDB integration (Mongoose)
- Testing with Jest & Supertest
- API documentation with Swagger
- Docker containerization

---

## 🛠 Tech Stack

- Node.js
- Express
- MongoDB / Mongoose
- Joi
- Jest / Supertest
- Swagger
- Docker

---

## ⚙️ Installation

```bash
npm install
cp .env.example .env
```

---

## ▶️ Run

```bash
npm start
```

Server runs on:
`http://localhost:8080`

---

## 📡 API Endpoints (Mocks)

| Method | Route | Description |
| ------ | ------ | ------------- |
| GET | /api/mocks/mockingpets | Returns mock pets |
| GET | /api/mocks/mockingusers | Returns mock users |
| POST | /api/mocks/generateData | Inserts mock data into DB |

---

## 🧪 Testing

```bash
npm test
```

---

## 🐳 Docker

```bash
docker build -t backend-api .
docker run -p 8080:8080 backend-api
```

---

## 📌 Author

Tomás Orella
Full Stack Developer (Backend-focused)
