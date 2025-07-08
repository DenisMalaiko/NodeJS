import { MetricsService } from '../service/metrics.service';
import { Injectable } from '../../core/decorators';
import { Inject } from '../../core/decorators/inject';

export interface Book {
  id: string;
  title: string;
}

@Injectable()
export class BooksService {
  constructor(@Inject(MetricsService) private metrics: MetricsService) {}

  #data: Book[] = [
    { id: '1', title: 'book1' },
    { id: '2', title: 'book2' },
    { id: '3', title: 'book3' }
  ];

  findAll() {
    this.metrics.store('GET /books');
    return {
      data: this.#data
    };
  }

  findOne(id: string) {
    this.metrics.store(`GET /book/${id}`);
    return {
      data: this.#data.find(b => b.id === id)
    };
  }

  create(data: { title: string }) {
    const book = { id: Date.now().toString(), title: data.title };
    this.#data.push(book);
    this.metrics.store('POST /book');
    return {
      data: book
    };
  }

  delete(id: string) {
    const index = this.#data.findIndex(b => b.id === id);
    if (index === -1) return null;
    const [deleted] = this.#data.splice(index, 1);
    this.metrics.store(`DELETE /book/${id}`);
    return {
      data: deleted
    };
  }
}
