export async function fetchNotIssuedOrders() {
  const res = await fetch("/api/order/not-issued");
  if (!res.ok) throw new Error("Ошибка загрузки заказов");
  return res.json();
}

export async function updateIssuedOrders(updates: { orderId: number }[]) {
  const res = await fetch("/api/order/update-issued", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error("Ошибка при сохранении заказов");
  return res.json();
}
