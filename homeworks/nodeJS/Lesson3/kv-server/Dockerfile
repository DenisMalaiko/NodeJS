# Builder
FROM node:18-alpine AS builder

WORKDIR /develop

COPY package.json package-lock.json tsconfig.json ./

RUN npm ci

COPY server ./server

# Runtime
FROM node:18-alpine

RUN apk add --no-cache tini

WORKDIR /app
USER node

COPY --from=builder /develop/node_modules ./node_modules
COPY --from=builder /develop/server ./server
COPY --from=builder /develop/package.json ./

EXPOSE 3000

ENTRYPOINT ["/sbin/tini","--"]
CMD ["node", "--loader", "ts-node/esm", "server/index.ts"]