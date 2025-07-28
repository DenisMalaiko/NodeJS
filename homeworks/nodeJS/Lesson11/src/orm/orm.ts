import { Pool } from 'pg';

export class Orm<T extends { id: string | number }> {

  constructor(
    private table:
    string, private pool: Pool
  ) {}

  async find(filters?: Partial<T>): Promise<T[]> {
    console.log("START FIND")
    return new Promise((resolve, reject) => {})
  }

  async findOne(id: T['id']): Promise<T | null> {
    console.log("FIND ONE")
    return new Promise((resolve, reject) => {})
  }

  async save(entity: Omit<T, 'id'>): Promise<T> {
    console.log("SAVE")
    return new Promise((resolve, reject) => {})
  }

  async update(id: T['id'], patch: Partial<T>): Promise<T> {
    console.log("UPDATE")
    return new Promise((resolve, reject) => {})
  }

  async delete(id: T['id']): Promise<void> {
    console.log("DELETE")
    return new Promise((resolve, reject) => {})
  }
}
