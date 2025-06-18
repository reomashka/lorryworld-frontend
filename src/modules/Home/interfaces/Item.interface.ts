export interface Item {
  id: number;
  name: string;
  price: number;
  type: string;
  icon?: string;
  description?: string;
  availability: boolean;
  game: string;
  rarity: string;
}
