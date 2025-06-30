import { Injectable, NotFoundException } from '@nestjs/common';
import { Tea } from '../../entities/tea.entity';

@Injectable()
export class TeaService {
  private teas: Tea[] = [];
  constructor() {
    this.teas = [
      {
        id: Date.now().toString(),
        name: 'Green',
        origin: 'China',
        rating: 4,
        brewTemp: 60,
        notes: 'A good tea',
      },
      {
        id: (Date.now() + 1000).toString(),
        name: 'Black',
        origin: 'India',
        rating: 3,
        brewTemp: 80,
        notes: 'A tasty tea',
      },
    ];
  }
  getAll(minRating: string): Tea[] {
    return this.teas.filter((tea: Tea) =>
      minRating ? tea.rating >= Number(minRating) : true,
    );
  }
  getById(id: string): Tea {
    const tea: Tea | undefined = this.teas.find((tea: Tea) => tea.id === id);
    if(!tea) throw new NotFoundException('Tea not found');
    return tea;
  }
}
