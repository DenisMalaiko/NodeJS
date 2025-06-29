################# 1. deps (backend) #################################
FROM node:20-alpine AS deps

WORKDIR /workspace

# копіюємо тільки backend-залежності
COPY backend/package*.json backend/

RUN --mount=type=cache,target=/root/.npm \
    npm --prefix backend ci --omit=dev
################# 2. backend prune (залишаємо prod-deps) ##############
FROM node:20-alpine AS backend

WORKDIR /workspace/backend

COPY --from=deps /workspace/backend/node_modules ./node_modules

COPY backend/ .

RUN npm prune --omit=dev        # тільки тут випиляємо dev-deps

################# 4. runtime (tiny) ###################################
FROM alpine:3.19

RUN apk add --no-cache nodejs tini

WORKDIR /app

COPY --from=backend   /workspace/backend            ./

ENV NODE_ENV=production

EXPOSE 3000

ENTRYPOINT ["/sbin/tini","--"]

CMD ["node","src/server.js"]