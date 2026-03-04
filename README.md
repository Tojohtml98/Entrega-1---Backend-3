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

## Documentación Swagger

La documentación de la API está disponible en:

- `http://localhost:8080/api/docs`

Ahí podés explorar los endpoints de `Users` y probar las peticiones.

## Tests funcionales

Se utilizan **Jest** y **Supertest** para los tests funcionales del router de adopciones.

```bash
npm test
```

Asegurate de tener una instancia de MongoDB disponible o configurar `MONGODB_URI_TEST` si querés que los tests se conecten a otra base.

## Docker

### Construir la imagen

Desde la raíz del proyecto:

```bash
docker build -t TU_USUARIO_DOCKER/entrega-backend3:latest .
```

### Ejecutar el contenedor

```bash
docker run -p 8080:8080 \
  -e MONGODB_URI="mongodb://host.docker.internal:27017/entrega1" \
  TU_USUARIO_DOCKER/entrega-backend3:latest
```

La API quedará disponible en `http://localhost:8080`.

### Imagen en Dockerhub

Cuando publiques la imagen en Dockerhub, actualizá este enlace con la URL real:

- Link a la imagen en Dockerhub: `https://hub.docker.com/r/TU_USUARIO_DOCKER/entrega-backend3`

