export async function fetchNotIssuedOrders() {
  const res = await fetch("/api/order/not-issued", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Ошибка загрузки заказов");

  const text = await res.text();
  return text ? JSON.parse(text) : [];
}

export async function updateIssuedOrders(updates: { orderId: number }[]) {
  const res = await fetch("/api/order/update-issued", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });

  if (!res.ok) throw new Error("Ошибка при сохранении заказов");

  const text = await res.text();
  return text ? JSON.parse(text) : null;
}
