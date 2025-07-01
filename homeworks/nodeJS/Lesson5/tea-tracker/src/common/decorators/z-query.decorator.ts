import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

export const ZQuery = (schema: ZodSchema) =>
  createParamDecorator((_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const result = schema.safeParse(request.query);

    if (!result.success) {
      throw new BadRequestException(result.error.format());
    }

    return result.data;
  })();