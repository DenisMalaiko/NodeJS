import { z } from 'zod';

export const BrewDTO = z.object({
  beans: z.string().min(3).max(40).optional(),
  method: z.enum(['v60', 'aeropress', 'chemex', 'espresso']).optional(),
  rating: z.number().min(1).max(5).optional(),
  notes: z.string().max(200).optional(),
  brewedAt: z.string().datetime().optional().default("2020-01-01T00:00:00Z"),
});