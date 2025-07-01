import { Controller, Get, Post, Put, Delete, Param, Query } from '@nestjs/common';
import { ZQuery } from "../common/decorators/z-query.decorator";
import { ZBody } from "../common/decorators/z-body.decorator";
import { TeaService } from './tea.service';
import { Tea } from '../common/entities/tea.entity';
import { RateLimit } from "../common/decorators/rate-limit.decorator";
import { Public } from "../common/decorators/public.decorator";
import { ApiHeader, ApiBody, ApiQuery, ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { CreateTeaDtoType, UpdateTeaDtoType, TeaSchema } from '../common/dto/tea.dto';
import { TeaQueryParamsDto, TeaQueryParamsDtoType } from "../common/dto/tea-query-params.dto";

@Controller('tea')
export class TeaController {
  constructor(private readonly TeaService: TeaService) {}

  @Get()
  @Public()
  @ApiQuery({ name: 'minRating', required: false, type: String })
  @ApiQuery({ name: 'page', required: false, type: String })
  @ApiQuery({ name: 'pageSize', required: false, type: String })
  getAll(@ZQuery(TeaQueryParamsDto) queryParams: TeaQueryParamsDtoType) {
    return this.TeaService.getAll(queryParams);
  }


  @Get(':id')
  @ApiHeader({
    name: 'x-api-key',
    description: 'API Key to bypass the guard. Use "TEST"',
    required: true,
  })
  getById(@Param('id') id: string): Promise<Tea> {
    return this.TeaService.getById(id);
  }


  @Post()
  @RateLimit(10)
  @ApiHeader({
    name: 'x-api-key',
    description: 'API Key to bypass the guard. Use "TEST"',
    required: true,
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', minLength: 3, maxLength: 40 },
        origin: { type: 'string', minLength: 3, maxLength: 30 },
        rating: { type: 'number', minimum: 1, maximum: 10 },
        brewTemp: { type: 'number', minimum: 60, maximum: 100 },
        notes: { type: 'string', maxLength: 150 },
      },
      required: ['name', 'origin'],
    },
  })
  @ApiCreatedResponse({
    description: 'Tea was successfully created',
  })
  @ApiBadRequestResponse({
    description: 'Invalid input. Rating must be between 1 and 10 (11 is not allowed)',
  })
  create(@ZBody(TeaSchema) tea: CreateTeaDtoType) {
    return this.TeaService.create(tea);
  }


  @Put(':id')
  @ApiHeader({
    name: 'x-api-key',
    description: 'API Key to bypass the guard. Use "TEST"',
    required: true,
  })
  update(@Param('id') id: string, @ZBody(TeaSchema) tea: UpdateTeaDtoType) {
    return this.TeaService.update(id, tea);
  }


  @Delete(':id')
  @ApiHeader({
    name: 'x-api-key',
    description: 'API Key to bypass the guard. Use "TEST"',
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.TeaService.delete(id);
  }
}
