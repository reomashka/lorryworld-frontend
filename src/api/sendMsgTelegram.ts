export const sendMsgTelegram = async (
  text: string,
  withButton: boolean,
  type: string,
  userId?: string
) => {
  const res = await fetch("/api/telegram/send-msg", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text,
      withButton,
      type,
      userId,
    }),
  });

  if (!res.ok) {
    throw new Error("Ошибка при отправке сообщения");
  }

  return res.json();
};
