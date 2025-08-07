#Builder
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm ci

COPY src ./src

RUN npm run build

# Runtime
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY --from=builder /app/dist ./dist

RUN npm install --omit=dev

CMD ["node", "dist/main.js"]

