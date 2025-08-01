export const fetchActiveOrders = async (userId: string) => {
  const response = await fetch(`/api/order/active?userId=${userId}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "Ошибка получения заказов");
  }

  return resData;
};
