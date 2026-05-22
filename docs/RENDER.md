# Despliegue en Render

## Servicio configurado

| Campo | Valor |
|-------|--------|
| Nombre | `scalable-backend-api` |
| URL | https://scalable-backend-api.onrender.com |
| Blueprint | `render.yaml` en la raíz del repo |
| Repo | https://github.com/Tojohtml98/Entrega-1---Backend-3 |

## Estado

El servicio puede estar **suspendido** o en **cold start** (plan free). Si `/health` no responde:

1. https://dashboard.render.com → servicio **scalable-backend-api**
2. **Resume** / reactivar
3. **Environment** → `MONGO_URI` con tu URI de Atlas (obligatorio)
4. **Manual Deploy** → último commit de `main`

## Verificación

```bash
curl https://scalable-backend-api.onrender.com/health
open https://scalable-backend-api.onrender.com/api/docs
```

## MongoDB Atlas

1. Cluster en https://cloud.mongodb.com
2. Usuario + contraseña en Database Access
3. Network Access: `0.0.0.0/0` (o IPs de Render)
4. Pegar URI en `MONGO_URI` en Render:

```
mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/entrega1?retryWrites=true&w=majority
```

## Auto-deploy

Cada push a `main` dispara deploy si `autoDeploy: true` en `render.yaml`.
