import { http } from "@/lib/http";
import { TypeRegisterSchema } from "@components/schemes";

export async function fetchRegister(data: TypeRegisterSchema) {
  return await http("/api/auth/register", {
    method: "POST",
    credentials: "include",
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password,
      passwordRepeat: data.passwordReapeat,
    }),
  });
}
