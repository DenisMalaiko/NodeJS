import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import pino from 'pino-http';
import { config } from './config/index.js';
import { container } from './container.js';
import { scopePerRequest } from 'awilix-express';
import swaggerUi from 'swagger-ui-express';
import { generateSpecs } from './docs/index.js';
import { notFound } from './middlewares/notFound.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { router as brewsRouter } from './routes/brews.routes.js';

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(compression());

  if (config.env === 'development') {
    app.use(morgan('dev'))
  }

  if (config.env === 'production') {
    app.use(pino())
  }


  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // DI scope-per-request (Awilix)
  // • Створює дочірній контейнер на кожен HTTP-запит.
  // • У нього резолвляться Model → Service → Controller,
  //   тому стейт не “тече” між паралельними запитами.
  app.use(scopePerRequest(container));

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
  app.use('/api', brewsRouter);

  app.use(notFound);

  app.use(errorHandler);

  return app;
}