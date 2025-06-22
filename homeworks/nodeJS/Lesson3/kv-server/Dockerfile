FROM node:18-alpine

WORKDIR /app

# Копіюємо package.json і tsconfig.json
COPY package.json tsconfig.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо весь код
COPY ./server ./server

# Вказуємо порт
EXPOSE 3000

# Вказуємо запуск через ts-node + esm
CMD ["node", "--loader", "ts-node/esm", "server/index.ts"]