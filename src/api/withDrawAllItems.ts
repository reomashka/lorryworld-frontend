export const withDrawAllItems = async (userId: string, game: "MM" | "GAG") => {
  const response = await fetch(`/api/item/withdraw`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userId,
      game: game,
    }),
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "Ошибка при выводе предметов");
  }

  return resData;
};
