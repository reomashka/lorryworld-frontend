import { http } from "@/lib/http";
import UserItem from "@sharedTypes/userItem.interface";

export async function fetchPurchasedItems(userId: string): Promise<UserItem[]> {
  return await http(`/api/item/get-all-purchased/${userId}`);
}
