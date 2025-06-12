import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().min(1, {
    message: "Некорректная почта",
  }),
  password: z.string().min(6, {
    message: "Пароль должен содержать минимум 6 символов",
  }),
});

export type TypeLoginSchema = z.infer<typeof LoginSchema>;
