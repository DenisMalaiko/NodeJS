import { Pool } from 'pg';

export class Orm<T extends { id: string | number }> {

  constructor(
    private table:
    string, private pool: Pool
  ) {}

  async find(filters?: Partial<T>): Promise<T[]> {
    let sql = `SELECT * FROM ${this.table}`;
    const values: any[] = [];

    if (filters && Object.keys(filters).length > 0) {
      const conditions = Object.entries(filters).map(([key, value], index) => {
        values.push(value);
        return `${key} = $${index + 1}`;
      });

      sql += ` WHERE ` + conditions.join(' AND ');
    }

    const result = await this.pool.query(sql, values);
    return result.rows;
  }

  async findOne(id: T['id']): Promise<T | null> {
    const sql = `SELECT * FROM ${this.table} WHERE id = $1 LIMIT 1`;

    try {
      const result = await this.pool.query(sql, [id]);
      if (result.rows.length === 0) {
        return null;
      }
      return result.rows[0];
    } catch (error) {
      console.error('Database error:', error);
      throw error;
    }
  }

  async save(entity: Omit<T, 'id'>): Promise<T> {
    const keys = Object.keys(entity);
    const values = Object.values(entity);
    const columns = keys.join(', ');
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');

    const sql = `INSERT INTO ${this.table} (${columns}) VALUES (${placeholders}) RETURNING *`;

    const result = await this.pool.query(sql, values);
    return result.rows[0];
  }

  async update(id: T['id'], patch: Partial<T>): Promise<T> {
    const keys = Object.keys(patch);
    const values = Object.values(patch);

    if (keys.length === 0) {
      throw new Error('Nothing to update');
    }

    const setClause = keys
      .map((key, index) => `${key} = $${index + 1}`)
      .join(', ');

    const sql = `UPDATE ${this.table} SET ${setClause} WHERE id = $${
      keys.length + 1
    } RETURNING *`;

    const result = await this.pool.query(sql, [...values, id]);
    return result.rows[0];
  }

  async delete(id: T['id']): Promise<void> {
    const sql = `DELETE FROM ${this.table} WHERE id = $1`;
    const result = await this.pool.query(sql, [id]);

    if (result.rowCount === 0) {
      throw new Error(`Record with id ${id} not found`);
    }
  }
}
