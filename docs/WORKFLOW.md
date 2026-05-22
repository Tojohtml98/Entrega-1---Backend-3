# Flujo de trabajo: Cursor + iTerm2 + Claude Code

Este proyecto se puede editar desde tres sitios a la vez. Todos leen y escriben los mismos archivos en disco.

## Roles recomendados

| Herramienta | Mejor para |
|-------------|------------|
| **Cursor (Auto)** | Editar código, resolver conflictos git, PRs, tests, README, Render |
| **iTerm2 + Claude Code** | Comandos largos, explorar el sistema, scripts one-off |
| **iTerm2 (sin agente)** | `npm start`, `docker`, logs en vivo |

## Reglas para no pisarse

1. **Una tarea activa por agente** — No edites el mismo archivo en Cursor y Claude Code al mismo tiempo.
2. **Git como fuente de verdad** — Antes de cambiar de herramienta: `git status` y commit o stash si hace falta.
3. **Variables de entorno** — `.env` solo en local; en Render configurá `MONGO_URI` en el dashboard (nunca en el repo).

## Comandos habituales (iTerm2)

```bash
cd ~/Entrega-1---Backend-3-main
npm install
cp .env.example .env   # editá MONGO_URI
npm run dev
npm test
```

## Cursor

Abrí esta carpeta como workspace:

`~/Entrega-1---Backend-3-main`

El agente puede ejecutar tests, editar rutas y empujar a GitHub cuando lo pidas.

## Shell en macOS (Homebrew)

Si ves error `libllhttp` / `libgit2` al abrir terminal en Cursor, en iTerm2:

```bash
brew reinstall llhttp libgit2
```

Luego reiniciá Cursor.
