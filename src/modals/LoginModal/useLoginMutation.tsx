import { useMutation } from "@tanstack/react-query";
import { loginFetchData } from "src/api/loginFetchData";
import { TypeLoginSchema } from "@components/schemes";
import { useNavigate } from "react-router-dom";

import { userStore } from "@store/userStore";

import { toast } from "react-toastify";

export function useLoginMutation() {
  const navigate = useNavigate();

  return useMutation<TypeLoginSchema, Error, TypeLoginSchema>({
    mutationFn: loginFetchData,
    onSuccess: () => {
      navigate("/", { replace: true });
      userStore.fetchProfile();
      toast.success("Успешный вход в аккаунт");
    },
    onError: (err: Error) => {
      const message = err.message || "Неизвестная ошибка";
      toast.error("Ошибка при входе: " + message);
    },
  });
}
