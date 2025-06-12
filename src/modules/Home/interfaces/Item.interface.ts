export default interface Item {
  id: number;
  name: string;
  price: number;
  type: string;
  image?: string;
  description: string;
  availability?: number;
  game: string;
  rarity: string;
}
