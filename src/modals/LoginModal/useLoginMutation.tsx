import { useMutation } from "@tanstack/react-query";
import { loginFetchData } from "src/api/loginFetchData";
import { TypeLoginSchema } from "@components/schemes";
import { useNavigate } from "react-router";

export function useLoginMutation() {
  const navigate = useNavigate();

  return useMutation<TypeLoginSchema, Error, TypeLoginSchema>({
    mutationFn: loginFetchData,
    onSuccess: () => {
      console.log("Логирование прошло успешно");
      navigate("/");
    },
    onError: (err: Error) => {
      const message = err.message || "Неизвестная ошибка";
      alert("Ошибка при входе: " + message);
    },
  });
}
