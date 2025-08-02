import { z } from 'zod';

export const TransferSchema = z.object({
  fromId: z.string().uuid(),
  toId: z.string().uuid(),
  amount: z.number().min(0.01),
});

export type TransferDto = z.infer<typeof TransferSchema>;