import { http } from "@/lib/http";

export async function getRecentWithdrawnItems(userId: string) {
  return await http(`/api/item/get-all-recent-withdrawn/${userId}`);
}
