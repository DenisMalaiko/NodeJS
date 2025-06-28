FROM node:20

WORKDIR /app

COPY ../backend/package*.json backend/

RUN npm ci

COPY ../backend  backend

RUN npm --prefix backend run build

EXPOSE 3000
CMD ["node", "backend/dist/server.min.js"]