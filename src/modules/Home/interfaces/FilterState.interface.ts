export interface FilterState {
  selectedTypes: string[];
  selectedRarities: string[];
  selectedProperties?: string[];
  minPrice: number;
  maxPrice: number;
  searchTerm: string;
  selectedSort: "standard" | "cheaper" | "expensive";
}
