import { Pool } from 'pg';
import { SQL } from 'sql-template-strings';

export class Orm<T extends { id: string | number }> {

  constructor(
    private table: string,
    private pool: Pool
  ) {}

  async find(filters?: Partial<T>): Promise<T[]> {
    let query = SQL`SELECT * FROM `.append(`${this.table}`);

    if (filters && Object.keys(filters).length > 0) {
      query = query.append(SQL` WHERE `);

      const entries = Object.entries(filters);

      entries.forEach(([key, value], index) => {
        if (index > 0) query = query.append(SQL` AND `);

        query = query.append(key + ' = ').append(SQL`${value}`);
      });
    }

    const result = await this.pool.query(query);
    return result.rows;
  }

  async findOne(id: T['id']): Promise<T | null> {
    const query = SQL`SELECT * FROM `.append(this.table).append(SQL` WHERE id = ${id} LIMIT 1`);

    try {
      const result = await this.pool.query(query, [id]);
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

    let query = SQL`INSERT INTO `.append(this.table).append(` (${columns}) VALUES (`);

    values.forEach((value, index) => {
      if (index > 0) query = query.append(SQL`, `);
      query = query.append(SQL`${value}`);
    });

    query = query.append(SQL`) RETURNING *`);

    const result = await this.pool.query(query);
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

    const query = SQL`UPDATE `
      .append(this.table)
      .append(` SET `)
      .append(setClause)
      .append(` WHERE id = $${keys.length + 1} RETURNING *`);


    const result = await this.pool.query(query, [...values, id]);
    return result.rows[0];
  }

  async delete(id: T['id']): Promise<void> {
    const sql = SQL`DELETE FROM `.append(this.table).append(SQL` WHERE id = ${id}`);
    const result = await this.pool.query(sql, [id]);

    if (result.rowCount === 0) {
      throw new Error(`Record with id ${id} not found`);
    }
  }
}
