import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import pino from 'pino-http';
import path from 'node:path';
import { config } from './config/index.js';
import { container } from './container.js';
import { scopePerRequest } from 'awilix-express';
import swaggerUi from 'swagger-ui-express';
import {generateSpecs} from './docs/index.js';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { router as brewsRouter } from './routes/brews.routes.js';
//import { router as uploadsRouter } from './routes/uploads.routes.js';
//import {upload} from "./libs/multer.js";
import {attachStaticHandler} from "./static/attach-static-handler.js";

//const uploadDir = path.resolve('uploads');

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(compression());
  app.use(rateLimit({
    windowMs: 60_000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false
  }));
  /*app.use(morgan('dev'));
  app.use(pino());*/
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // DI scope-per-request (Awilix)
  // • Створює дочірній контейнер на кожен HTTP-запит.
  // • У нього резолвляться Model → Service → Controller,
  //   тому стейт не “тече” між паралельними запитами.
  app.use(scopePerRequest(container));


  // Статична React SPA
  // •  build/      ← результат `npm run build` фронтенд-репозиторію.
  // •  GET /index.html, /static/js/main.….js  повертаються без Node-логіки.
  // •  `maxAge` (за замовч.) = 0 для dev; у продакшн варто `maxAge:'7d'`.
  //attachStaticHandler(app)

  // Swagger /docs  (лише у development)
  // •  `generateSpecs()`  об’єднує Zod-DTO, JSDoc і YAML-upload у єдину OpenAPI.
  // •  `/docs` дає Swagger-UI, щоб швидко тестувати запити.
  // •  baseUrl читаємо з конфігу, в консоль — корисний hint для розробника.
  if (config.env === 'development') {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(generateSpecs()));
    console.log(`Swagger docs → ${config.baseUrl}/docs`);
  }


  // API-маршрути (REST + валідація + DI)
  // •  /api/brews      CRUD через BrewsController
  // •  Всі роути всередині вже мають validate(BrewsDTO) і asyncHandler.
  console.log("ROUTE BREWS ", brewsRouter);
  app.use('/api', brewsRouter);

  // 404 «Маршрут не знайдено»
  // • Спрацьовує лише, якщо жоден попередній middleware не надіслав
  //   response. Повертає JSON { error: 'Route not found' }.
  app.use(notFound);

  // Глобальний error-handler
  // • Перехоплює throw new Error() або next(err).
  // • Логи —  req.log.error({ err })  (pino),  відповідь — status 400/500.
  // • Завжди останній у ланцюжку.
  app.use(errorHandler);

  return app;
}