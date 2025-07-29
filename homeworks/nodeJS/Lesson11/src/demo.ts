import dotenv from 'dotenv';
import { Pool } from 'pg';
import { Product } from "./repositories/product.repo";
import { ProductRepo } from "./repositories/product.repo";

dotenv.config();

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const productRepo = new ProductRepo(pool);

async function initDB() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('Database connected at:', result.rows[0].now);

    const newProduct: Omit<Product, 'id'> = {
      name: 'Porsche 911',
      description: 'Sport Car',
      price: 10000
    };

    const product = await productRepo.save(newProduct);
    const productId = product.id;
    console.log('Saved product:', product);

    const allProducts = await productRepo.find();
    console.log('All product:', allProducts);

    const updatedUser = await productRepo.update(productId, {
      name: 'Lamba',
      description: 'Lambda Car',
      price: 9999
    });
    console.log('Updated product:', updatedUser);

    await productRepo.delete(productId);
    console.log(`Delete product by id: ${productId}`);

    const deletedProduct = await productRepo.findOne(productId);
    console.log('Deleted product:', deletedProduct);

  } catch (err) {
    console.error('Database connection error:', err);
  } finally {
    await pool.end();
  }
}

initDB();