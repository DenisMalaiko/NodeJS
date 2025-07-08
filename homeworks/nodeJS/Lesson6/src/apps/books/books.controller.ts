import { BooksService } from "./books.service";
import { ZodValidationPipe } from "../pipes/zod.pipe";
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
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  getAll() {
    return this.bookService.findAll();
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createBookSchema))
  create(@Body() data: any) {
    return this.bookService.create(data);
  }

  @Delete("/:id")
  delete(@Params("id") id: string) {
    return this.bookService.delete(id);
  }
}
