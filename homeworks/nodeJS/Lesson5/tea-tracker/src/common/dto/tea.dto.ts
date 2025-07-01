import { z } from 'zod';

export const TeaSchema = z.object({
  name: z.string().min(3).max(40),
  origin: z.string().min(3).max(30),
  rating: z
    .number()
    .min(1)
    .max(10)
    .refine(val => val !== 11, { message: 'Rating of 11 is not allowed' })
    .optional(),
  brewTemp: z.number().min(60).max(100).optional(),
  notes: z.string().max(150).optional(),
});

export const CreateTeaDto = TeaSchema.required();
export const UpdateTeaDto = TeaSchema.partial();

export type CreateTeaDtoType = z.infer<typeof CreateTeaDto>;
export type UpdateTeaDtoType = z.infer<typeof UpdateTeaDto>;