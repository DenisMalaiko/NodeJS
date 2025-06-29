# docker/simple.Dockerfile
FROM node:20

WORKDIR /app

# ── 1. копіюємо маніфести для кешу ───────────────────────────────
COPY backend/package*.json   backend/

# ── 2. встановлюємо залежності підпроєктів окремо ────────────────
RUN npm --prefix backend  install

# ── 3. копіюємо решту коду (JS, TS, assets…) ─────────────────────
COPY backend   backend/

# ── 4. стартуємо API-сервер ──────────────────────────────────────
EXPOSE 3000

CMD ["node", "backend/src/server.js"]