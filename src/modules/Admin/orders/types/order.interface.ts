import { OrderItem } from "./orderItem.interface";
import { User } from "@sharedTypes/user.interface";

export interface Order {
  id: number;
  orderNumber: number;
  userId: string;
  isIssued: boolean;
  createdAt: string;
  user: User;
  items: OrderItem[];
}
