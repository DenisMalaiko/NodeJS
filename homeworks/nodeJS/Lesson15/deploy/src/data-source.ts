import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Product } from './entities/product.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || '1111',
  database: process.env.DB_NAME || 'deploy',
  entities: [Product],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
