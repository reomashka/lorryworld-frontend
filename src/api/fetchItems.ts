export const fetchItems = async () => {
  const response = await fetch("/api/item/get-all", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "Ошибка получения айтемов");
  }

  return resData;
};
