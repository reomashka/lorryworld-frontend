import { http } from "@/lib/http";
import { Order } from "@modules/Admin/Orders/types/order.interface";

export async function fetchActiveOrders(userId: string): Promise<Order[]> {
  return await http(`/api/order/active?userId=${userId}`, {
    method: "GET",
  });
}
