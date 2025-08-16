export interface StatsData {
  earnings: {
    today: number;
    yesterday: number;
    week: number;
  };
  items: {
    today: number;
    yesterday: number;
    week: number;
  };
  registrations: {
    today: number;
    yesterday: number;
    week: number;
  };
}

export const getAdminStats = async () => {
  const res = await fetch("/api/admin/stats", {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("No data");
  }

  return res.json();
};
