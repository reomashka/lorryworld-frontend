import { FilterState } from "@modules/Home/interfaces/FilterState.interface";

export const defaultFilters: Record<string, FilterState> = {
  MM: {
    selectedTypes: ["KNIFE", "PISTOL", "SET", "PET"],
    selectedRarities: [
      "chroma",
      "ancients",
      "godly",
      "vintages",
      "corrupt",
      "rare",
      "common",
      "uncommon",
      "legendary",
    ],
    minPrice: 0,
    maxPrice: 0,
    searchTerm: "",
    selectedSort: "expensive",
  },
  GAG: {
    selectedTypes: ["FRUITS", "GIANTPETS", "PETS", "BUNDLES"],
    selectedRarities: ["blue", "yellow", "purple", "red", "green"],
    minPrice: 0,
    maxPrice: 0,
    searchTerm: "",
    selectedSort: "expensive",
  },
};
