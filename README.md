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

A backend service designed to handle **users**, **pets** and **adoptions** with a focus on the engineering practices that matter past a tutorial: clear layer separation, deterministic seed data, runtime validation, integration tests, and an always-on hosted environment that recruiters can hit in one click.

It is intentionally small in surface area and deep in craft — the value is **how** each piece is built, not how many endpoints it ships.

---

## Tech Stack

- **Runtime** — Node.js 20, Express 4
- **Database** — MongoDB (Mongoose ODM) hosted on MongoDB Atlas
- **Validation** — Joi schemas at the route boundary
- **Documentation** — OpenAPI 3 via `swagger-jsdoc` + `swagger-ui-express`
- **Testing** — Jest + Supertest, in-band run for deterministic suites
- **Containerization** — Docker, multi-stage friendly
- **Mocking** — `faker` for deterministic seeding of users/pets

---

## Architecture

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   Routes     │ ─▶ │ Controllers  │ ─▶ │   Services   │ ─▶ │    Models    │
│  (Express)   │    │  (HTTP I/O)  │    │  (business)  │    │  (Mongoose)  │
└──────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
                            ▲                  │
                            │                  ▼
                       Joi validation     MongoDB Atlas
```

Each request crosses **one boundary at a time**: HTTP concerns stay in controllers, domain rules in services, persistence in models. This keeps the test surface small (services are pure given a mocked model) and makes the API easy to extend without rewriting the call graph.

---

## Quick Start

```bash
git clone https://github.com/Tojohtml98/Scalable-Backend-API.git
cd Scalable-Backend-API
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
| POST   | `/api/pets`                    | Create pet                           |
| POST   | `/api/adoption/:uid/:pid`      | Adopt pet `pid` for user `uid`       |
| GET    | `/api/mocks/mockingusers`      | Generate N mock users (no insert)    |
| GET    | `/api/mocks/mockingpets`       | Generate N mock pets (no insert)     |
| POST   | `/api/mocks/generateData`      | Seed users + pets into the database  |

### Try it (cURL)

```bash
# Liveness
curl https://scalable-backend-api.onrender.com/health

# Generate 10 mock users (no DB write — useful for fixtures)
curl https://scalable-backend-api.onrender.com/api/mocks/mockingusers

# Seed the DB with deterministic data
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

See `.env.example` for the template.

---

## Testing

```bash
npm test
```

Jest runs functional tests against Express via Supertest with `--runInBand` to keep DB state deterministic. Tests live in `tests/` and exercise the public HTTP surface, not the internals — refactors don't break the suite.

---

## Docker

```bash
docker build -t scalable-backend-api .
docker run -p 8080:8080 --env-file .env scalable-backend-api
```

---

## Deployment

- **Host:** Render (free tier) · `render.yaml` blueprint at repo root
- **CD:** Auto-deploy on push to `main`
- **DB:** MongoDB Atlas (M0 cluster, separate database per project)
- **Cold start:** ~25s on first hit after idle (free tier limitation)

---

## Design Decisions

- **Why layers and not a flat structure?** Past 10 endpoints, flat routes turn into 800-line files with tangled responsibilities. Layered code costs little upfront and keeps both growth and testing cheap.
- **Why Joi at the boundary instead of inside services?** Services should trust their inputs. Validation lives where the trust boundary actually is — the HTTP edge.
- **Why Swagger over hand-written docs?** Schemas live next to the route definitions, so drift between code and docs is structurally hard. Recruiters get an interactive playground for free.
- **Why deterministic mocks with `faker`?** Seeding with a fixed seed produces the same fixtures every run, making integration tests reproducible across machines and CI.
- **Why Docker even on a small API?** Containerization is the lowest-cost insurance against "works on my machine" — and the image is a portable artifact for any cloud later.

---

## License

MIT © [Tomás Orella](https://github.com/Tojohtml98)
