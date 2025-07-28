import { Pool } from 'pg';
import { Orm } from '../orm/orm';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

export class ProductRepo extends Orm<Product> {
  constructor(pool: Pool) {
    super('products', pool);
  }
}