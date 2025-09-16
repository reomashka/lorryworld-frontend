import { http } from "@/lib/http";

export async function fetchActiveOrders(userId: string) {
  return await http(`/api/order/active?userId=${userId}`, {
    method: "GET",
  });
}
