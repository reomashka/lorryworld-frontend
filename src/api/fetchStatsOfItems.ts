type Period = "day" | "week" | "all";

export const fetchStatsOfItems = async (period: Period) => {
  const response = await fetch(`/api/admin/stats/items?period=${period}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(resData.message || "Ошибка получения айтемов");
  }

  return resData;
};
