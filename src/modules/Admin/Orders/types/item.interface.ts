export interface Item {
  id: number;
  name: string;
  price: number;
  sale: number | null;
  availability: boolean;
  type: string;
  icon: string;
  description: string | null;
  game: string;
  rarity: string;
  property?: string;
}
