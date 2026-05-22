<h1 align="center">Scalable Backend API</h1>

<p align="center">
  <strong>Production-grade REST API showcasing layered architecture, data seeding, OpenAPI documentation and end-to-end testing.</strong>
</p>

<p align="center">
  <a href="https://scalable-backend-api.onrender.com/api/docs">Live API ↗</a> ·
  <a href="https://scalable-backend-api.onrender.com/api/docs">Swagger Docs ↗</a> ·
  <a href="https://scalable-backend-api.onrender.com/health">Health ↗</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-20-339933?logo=node.js&logoColor=white" alt="Node 20" />
  <img src="https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Tests-Jest%20%2B%20Supertest-C21325?logo=jest&logoColor=white" alt="Jest" />
  <img src="https://img.shields.io/badge/Docs-Swagger-85EA2D?logo=swagger&logoColor=black" alt="Swagger" />
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT" />
</p>

---

## Overview

A backend service designed to handle **users**, **pets** and **adoptions** with a focus on the engineering practices that matter past a tutorial: clear layer separation, deterministic seed data, integration tests, and an always-on hosted environment that recruiters can hit in one click.

It is intentionally small in surface area and deep in craft — the value is **how** each piece is built, not how many endpoints it ships.

If Render está suspendido o dormido, reactivá el servicio en el [dashboard](https://dashboard.render.com). Guía: [docs/RENDER.md](./docs/RENDER.md).

---

## Tech Stack

- **Runtime** — Node.js 20, Express 4
- **Database** — MongoDB (Mongoose ODM) hosted on MongoDB Atlas
- **Documentation** — OpenAPI 3 via `swagger-jsdoc` + `swagger-ui-express`
- **Testing** — Jest + Supertest, in-band run for deterministic suites
- **Containerization** — Docker
- **Mocking** — `faker` for seeding users/pets
- **Hosting** — Render (`render.yaml`)

---

## Architecture

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Routes     │ ─▶ │   Services   │ ─▶ │    Models    │
│  (Express)   │    │  (business)  │    │  (Mongoose)  │
└──────────────┘    └──────────────┘    └──────────────┘
                            │
                            ▼
                      MongoDB Atlas
```

Routes stay thin; business rules live in services; persistence in models.

---

## Quick Start

```bash
git clone https://github.com/Tojohtml98/Entrega-1---Backend-3.git
cd Entrega-1---Backend-3-main
npm install
cp .env.example .env   # fill MONGO_URI
npm start              # production
npm run dev            # watch mode
```

Server boots on `http://localhost:8080`.

---

## API Reference

Interactive docs (Swagger UI): **https://scalable-backend-api.onrender.com/api/docs**

| Method | Endpoint                       | Purpose                              |
| ------ | ------------------------------ | ------------------------------------ |
| GET    | `/health`                      | Liveness probe                       |
| GET    | `/api/users`                   | List users                           |
| GET    | `/api/users/:uid`              | Get user by id                       |
| GET    | `/api/pets`                    | List pets                            |
| GET    | `/api/pets/:pid`               | Get pet by id                        |
| POST   | `/api/adoption/:uid/:pid`      | Adopt pet `pid` for user `uid`       |
| GET    | `/api/adoption/:uid`           | User with adopted pets               |
| GET    | `/api/mocks/mockingusers`      | Generate mock users (no insert)      |
| GET    | `/api/mocks/mockingpets`       | Generate mock pets (no insert)       |
| POST   | `/api/mocks/generateData`      | Seed users + pets into the database  |

### Try it (cURL)

```bash
curl https://scalable-backend-api.onrender.com/health
curl https://scalable-backend-api.onrender.com/api/mocks/mockingusers
curl -X POST https://scalable-backend-api.onrender.com/api/mocks/generateData \
  -H "Content-Type: application/json" \
  -d '{"users": 50, "pets": 100}'
```

---

## Environment

| Variable       | Required | Description                                   |
| -------------- | -------- | --------------------------------------------- |
| `MONGO_URI`    | Yes      | MongoDB connection string                     |
| `PORT`         | No       | HTTP port (default `8080`)                    |
| `NODE_ENV`     | No       | `development` \| `production`                 |
| `PUBLIC_BASE_URL` | No    | Swagger server URL (Render sets automatically) |

See `.env.example` for the template.

---

## Testing

```bash
npm test
```

With MongoDB on `127.0.0.1:27017`, adoption tests run against `entrega1_test`. Without Mongo, tests skip with a warning (suite still passes).

```bash
MONGODB_URI_TEST=mongodb://127.0.0.1:27017/mi_test npm test
```

---

## Docker

```bash
docker build -t scalable-backend-api .
docker run -p 8080:8080 --env-file .env scalable-backend-api
```

---

## Deployment

- **Host:** Render (free tier) · `render.yaml` at repo root
- **Service:** `scalable-backend-api` → https://scalable-backend-api.onrender.com
- **CD:** Auto-deploy on push to `main`
- **Details:** [docs/RENDER.md](./docs/RENDER.md)

---

## Development (Cursor + iTerm2 + Claude Code)

Multi-tool workflow: [docs/WORKFLOW.md](./docs/WORKFLOW.md)

---

## License

MIT © [Tomás Orella](https://github.com/Tojohtml98)
