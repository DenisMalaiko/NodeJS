FROM node:18-alpine

WORKDIR /app

# Копіюємо package.json і tsconfig.json
COPY package.json tsconfig.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо весь код
COPY ./src ./src

# Вказуємо порт
EXPOSE 4000

# Вказуємо запуск через ts-node + esm
CMD ["node", "--loader", "ts-node/esm", "src/index.ts"]