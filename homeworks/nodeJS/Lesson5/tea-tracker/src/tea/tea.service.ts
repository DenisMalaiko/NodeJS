import { Injectable, NotFoundException } from '@nestjs/common';
import { Tea } from '../common/entities/tea.entity';
import { CreateTeaDtoType, UpdateTeaDtoType } from '../common/dto/tea.dto';
import { TeaQueryParamsDtoType } from '../common/dto/tea-query-params.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TeaService {
  private teas: Tea[] = [];
  constructor() {
    this.teas = [
      {
        id: uuid(),
        name: 'Green',
        origin: 'China',
        rating: 4,
        brewTemp: 60,
        notes: 'A good tea',
      },
      {
        id: uuid(),
        name: 'Black',
        origin: 'India',
        rating: 3,
        brewTemp: 80,
        notes: 'A tasty tea',
      },
    ];
  }
  getAll(query: TeaQueryParamsDtoType) {
    return new Promise((resolve, reject) => {
      const { minRating, page, pageSize } = query;

      try {
        const filtered = this.teas.filter((tea: Tea) =>
          minRating ? tea.rating >= Number(minRating) : true,
        );

        const total = filtered.length;
        const start = (page - 1) * pageSize;
        const data = filtered.slice(start, start + pageSize);

        resolve({
          data,
          total,
          page,
          pageSize,
        });

      } catch (error) {
        reject(error);
      }
    });
  }
  getById(id: string): Promise<Tea> {
    return new Promise((resolve, reject) => {
      const tea = this.teas.find((tea: Tea) => tea.id === id);
      if (!tea) {
        return reject(new NotFoundException('Tea not found'));
      }
      resolve(tea);
    });
  }

  create(data: CreateTeaDtoType): Promise<Tea> {
    return new Promise((resolve) => {
      const newTea = { id: uuid(), ...data };
      this.teas.push(newTea);
      resolve(newTea);
    });
  }

  update(id: string, data: UpdateTeaDtoType): Promise<Tea> {
    return new Promise((resolve, reject) => {
      const tea = this.teas.find((t) => t.id === id);
      if (!tea) {
        return reject(new NotFoundException('Tea not found'));
      }
      Object.assign(tea, data);
      resolve(tea);
    });
  }

  delete(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const index = this.teas.findIndex((t) => t.id === id);
      if (index === -1) {
        return reject(new NotFoundException('Tea not found'));
      }
      this.teas.splice(index, 1);
      resolve();
    });
  }
}