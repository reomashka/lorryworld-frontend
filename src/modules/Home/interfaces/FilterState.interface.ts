export interface FilterState {
  selectedTypes: string[];
  // selectedRarities: string[];
  minPrice: number | 0;
  maxPrice: number | 0;
  searchTerm: string;
}
