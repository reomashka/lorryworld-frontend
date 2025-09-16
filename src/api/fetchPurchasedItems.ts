import { http } from "@/lib/http";

export async function fetchPurchasedItems(userId: string) {
  return await http(`/api/item/get-all-purchased/${userId}`);
}
