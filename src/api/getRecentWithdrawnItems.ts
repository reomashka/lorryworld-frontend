export const getRecentWithdrawnItems = async (userId: string) => {
  const res = await fetch(`/api/item/get-all-recent-withdrawn/${userId}`);

  if (!res.ok) throw new Error("Ошибка получения выведенных предметов");

  return await res.json();
};
