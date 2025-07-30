import { useState } from "react";
import { FilterState } from "@modules/Home/interfaces/FilterState.interface";

export const useFilters = () => {
  const [filters, setFilters] = useState<FilterState>({
    selectedTypes: [
      "KNIFE",
      "PISTOL",
      "SET",
      "PET",
      "FRUITS",
      "GIANTPETS",
      "PETS",
      "BUNDLES",
    ],
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
      "blue",
      "yellow",
      "purple",
      "red",
      "green",
    ],
    minPrice: 0,
    maxPrice: 0,
    searchTerm: "",
    selectedSort: "expensive",
  });

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return { filters, updateFilters };
};
