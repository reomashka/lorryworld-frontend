import { z } from "zod";

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .min(2, {
        message: "Введите имя",
      })
      .regex(/^[a-zA-Z0-9._]+$/, {
        message:
          "Разрешены только латиница, цифры, точка и нижнее подчёркивание",
      }),
    email: z.string().min(1, {
      message: "Некорректная почта",
    }),
    password: z.string().min(6, {
      message: "Пароль должен содержать минимум 6 символов",
    }),
    passwordReapeat: z.string().min(6, {
      message: "Пароль подтверждения должен содержать минимум 6 символов",
    }),
  })
  .refine((data) => data.password === data.passwordReapeat, {
    message: "Пароли не совпадают",
    path: ["passwordReapeat"],
  });

export type TypeRegisterSchema = z.infer<typeof RegisterSchema>;
