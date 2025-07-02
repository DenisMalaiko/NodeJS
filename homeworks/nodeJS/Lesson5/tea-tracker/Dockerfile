# Етап 1: Dependencies
FROM node:20-alpine AS deps

WORKDIR /deps

COPY package*.json ./

RUN npm install --omit=dev


# Етап 2: Build
FROM node:20-alpine AS builder

WORKDIR /builder

COPY . .

COPY --from=deps /deps/node_modules ./node_modules

RUN npm run build

# Етап 3: Slim Runtime
FROM alpine:3.19

RUN apk add --no-cache nodejs tini && \
    rm -rf /usr/lib/node_modules/npm /usr/bin/npm /usr/share/man /usr/share/doc

WORKDIR /app

COPY --from=builder /builder/dist ./dist
COPY --from=deps /deps/node_modules ./node_modules
COPY package*.json ./

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "dist/main.js"]