import { Item } from "./item.interface";

export default interface UserItem {
  id: string;
  userId: string;
  isIssued: boolean;
  itemId: string;
  quantity: number;
  amount: number;
  status: string;
  mediaContact?: string;
  contact?: string;
  createdAt: string;

  item: Item;
}
