import { TypeLoginSchema } from "@components/schemes";

export const loginFetchData = async (
  data: TypeLoginSchema,
): Promise<TypeLoginSchema> => {
  const response = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  });
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "Неизвестная ошибка");
  }

  return resData;
};
