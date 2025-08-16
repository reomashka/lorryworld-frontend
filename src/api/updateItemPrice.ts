export const updateItemPrice = async (
  id: number,
  price: number,
  sale: number
) => {
  const res = await fetch(`/api/item/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
      price,
      sale,
    }),
  });

  if (!res.ok) {
    throw new Error("Ошибка при обновлении цены");
  }

  return res.json();
};
