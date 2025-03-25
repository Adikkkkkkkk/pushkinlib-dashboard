import { z } from 'zod';

export const signUpSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  libraryId: z.coerce.number(),
  libraryCard: z.string().nonempty('Карта библиотеки обязательна!'),
  password: z.string().min(8),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
