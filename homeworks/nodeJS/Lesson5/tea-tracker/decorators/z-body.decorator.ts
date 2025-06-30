import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';

import { ZodSchema, ZodError } from 'zod';

export const ZBody = (schema: ZodSchema) =>
  createParamDecorator(async (data: unknown, ctx: ExecutionContext) => {
    const request: Request = await ctx.switchToHttp().getRequest();

    return await schema.safeParseAsync(request.body).catch((err: unknown) => {
      if (err instanceof ZodError) {
        throw new BadRequestException(err.errors);
      }
      throw new BadRequestException('Invalid request body');
    });
  })();