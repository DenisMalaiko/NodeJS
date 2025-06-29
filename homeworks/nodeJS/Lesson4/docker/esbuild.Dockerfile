################ 1. deps (npm backend) ################
FROM node:20-alpine AS deps

WORKDIR /workspace

COPY backend/package*.json           backend/

# npm (backend) – dev+prod   |   pnpm (frontend) – dev+prod
RUN --mount=type=cache,target=/root/.npm \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
    npm  --prefix backend  ci

################ 2. backend build (esbuild bundle) #######################
FROM deps AS backend-build

WORKDIR /workspace/backend

COPY backend/ .

RUN node build.mjs                      # → dist/server.js

################ 3. runtime ################################################
FROM alpine:3.19

RUN apk add --no-cache nodejs tini && \
    rm -rf /usr/lib/node_modules/npm /usr/bin/npm /usr/share/man /usr/share/doc

WORKDIR /app

COPY --from=backend-build /workspace/backend/dist/server.mjs ./server.mjs

ENV NODE_ENV=production

EXPOSE 3000

ENTRYPOINT ["/sbin/tini","--"]

CMD ["node","server.mjs"]