export default interface FilterState {
  selectedTypes: string[];
  minPrice: number | 0;
  maxPrice: number | 0;
  searchTerm: string;
}
