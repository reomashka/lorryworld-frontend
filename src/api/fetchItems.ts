import { http } from "@/lib/http";
import { Item } from "@sharedTypes/item.interface";

export async function fetchItems() {
  return await http<Item[]>("/api/item/get-all");
}
