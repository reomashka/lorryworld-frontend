export const fetchPurchasedItems = async (userId: string) => {
  const response = await fetch(`/api/item/get-all-purchased/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "Ошибка получения купленных айтемов");
  }

  return resData;
};
