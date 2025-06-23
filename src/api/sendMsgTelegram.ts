export const sendMsgTelegram = async (
  text: string,
  withButton: boolean,
  userId?: string
) => {
  const res = await fetch("/api/telegram/send-msg", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text,
      withButton,
      userId,
    }),
  });

  if (!res.ok) {
    throw new Error("Ошибка");
  }

  return res.json();
};
