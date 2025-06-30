import { Controller, Get, Param, Query } from '@nestjs/common';
import { TeaService } from './tea.service';
import { Tea } from '../../entities/tea.entity';

@Controller('tea')
export class TeaController {
  constructor(private readonly teas: TeaService) {}
  @Get()
  getAll(@Query('minRating') minRating: string): Tea[] {
    return this.teas.getAll(minRating);
  }
  @Get(':id')
  getById(@Param('id') id: string): Tea {
    return this.teas.getById(id);
  }
}
