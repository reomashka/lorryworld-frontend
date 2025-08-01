import { Item } from "./item.interface";

export interface OrderItem {
  id: string;
  userId: string;
  orderId: number;
  itemId: number;
  quantity: number;
  amount: number;
  status: string;
  isIssued: boolean;
  updatedAt: string;
  createdAt: string;
  item: Item;
}
