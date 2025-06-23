import { TypeLoginSchema } from "@components/schemes";

export const loginFetchData = async (
  data: TypeLoginSchema
): Promise<TypeLoginSchema> => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      email: data.identifier.includes("@") ? data.identifier : undefined,
      name: !data.identifier.includes("@") ? data.identifier : undefined,
      password: data.password,
    }),
  });
  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "Неизвестная ошибка");
  }

  return resData;
};
