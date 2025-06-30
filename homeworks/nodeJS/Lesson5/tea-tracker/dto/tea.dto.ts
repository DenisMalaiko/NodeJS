import { z } from 'zod';

export const TeaSchema = z.object({
  name: z.string().min(3).max(40),
  origin: z.string().min(3).max(30),
  rating: z.number().min(0).max(5).optional(),
  brewTemp: z.number().min(60).max(100).optional(),
  notes: z.string().max(150).optional(),
});

export const CreateTeaDto = TeaSchema.required();
export const UpdateTeaDto = TeaSchema.partial();

export type CreateTeaDtoType = z.infer<typeof CreateTeaDto>;
export type UpdateTeaDtoType = z.infer<typeof UpdateTeaDto>;