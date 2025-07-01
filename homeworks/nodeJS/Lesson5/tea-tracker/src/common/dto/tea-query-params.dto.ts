import {z} from 'zod';

export const TeaQueryParamsDto = z.object({
  minRating: z.string().optional(),
  page: z.string().optional().default("1").transform(Number),
  pageSize: z.string().optional().default("10").transform(Number),
}).passthrough();

export type TeaQueryParamsDtoType = z.infer<typeof TeaQueryParamsDto>;
