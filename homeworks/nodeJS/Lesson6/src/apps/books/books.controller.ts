import { BooksService } from "./books.service";
import { ZodValidationPipe } from "../pipes/zod.pipe";
import { ParseIntPipe } from "../pipes/ParseIntPipe";
import { UseInterceptor } from '../../core/decorators/use-interceptor';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';
import { UseGuards } from "../../core/decorators";
import { RolesGuard } from "../guards/roles.guard";

import {
  Controller,
  Get,
  Post,
  Delete,
  Params,
  Body,
  UsePipes,
} from "../../core/decorators";
import { z } from "zod";

const createBookSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
});

@Controller("/books")
@UseGuards(RolesGuard)
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  @UseInterceptor(LoggingInterceptor)
  getAll() {
    return this.bookService.findAll();
  }

  @Get("/:id")
  @UsePipes(new ParseIntPipe())
  findOne(@Params("id") id: string) {
    return this.bookService.findOne(id);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createBookSchema))
  create(@Body() data: any) {
    return this.bookService.create(data);
  }

  @Delete("/:id")
  @UsePipes(new ParseIntPipe())
  delete(@Params("id") id: string) {
    return this.bookService.delete(id);
  }
}
