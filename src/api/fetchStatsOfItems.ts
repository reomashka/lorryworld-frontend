import { http } from "@/lib/http";
import { ItemStats } from "@modules/Admin/StatsItems/StatsItemsModule";

type Period = "day" | "week" | "all";

export async function fetchStatsOfItems(period: Period): Promise<ItemStats[]> {
  return await http(`/api/admin/stats-items?period=${period}`);
}
