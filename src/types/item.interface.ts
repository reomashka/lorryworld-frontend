export interface Item {
  id: number;
  name: string;
  price: number;
  sale: number;
  type: string;
  icon?: string;
  description?: string;
  availability: boolean;
  game: "MM" | "GAG" | "AM";
  rarity: string;
  property?: string;
}
