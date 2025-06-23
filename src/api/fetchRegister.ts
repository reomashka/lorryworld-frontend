import { TypeRegisterSchema } from "@components/schemes";

export const registerUser = async (data: TypeRegisterSchema) => {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password,
      passwordRepeat: data.passwordReapeat,
    }),
  });

  const resData = await response.json();

  if (!response.ok) {
    // Можно выбросить ошибку с сообщением от сервера
    throw new Error(resData.message || "Ошибка регистрации");
  }

  return resData;
};
