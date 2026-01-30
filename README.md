# Entrega N°1 - Backend 3

Router Mocks, generación de usuarios/mascotas mock y endpoint para insertar datos en la base de datos.

## Requisitos

- Node.js
- MongoDB (local o URI en variable de entorno)
- Variables opcionales: `PORT`, `MONGODB_URI` (archivo `.env`)

## Instalación

```bash
npm install
```

## Ejecución

```bash
npm run dev
```

Por defecto el servidor corre en `http://localhost:8080`.

## Endpoints - Router Mocks (`/api/mocks`)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/mocks/mockingpets` | Devuelve mascotas mock (sin guardar en BD). Query opcional: `?quantity=20` (máx. 100). |
| GET | `/api/mocks/mockingusers` | Genera 50 usuarios mock con password "coder123" encriptada, role user/admin y pets []. Formato tipo Mongo. |
| POST | `/api/mocks/generateData` | Genera e inserta en la BD. Body: `{ "users": number, "pets": number }`. |

## Verificación de datos insertados

Después de llamar a `POST /api/mocks/generateData`:

- **Usuarios:** `GET /api/users` — listado; `GET /api/users/:uid` — por ID.
- **Mascotas:** `GET /api/pets` — listado; `GET /api/pets/:pid` — por ID.

## Ejemplo de uso

```bash
# Generar 5 usuarios y 10 mascotas en la BD
curl -X POST http://localhost:8080/api/mocks/generateData \
  -H "Content-Type: application/json" \
  -d '{"users": 5, "pets": 10}'

# Ver usuarios insertados
curl http://localhost:8080/api/users

# Ver mascotas insertadas
curl http://localhost:8080/api/pets
```
