import { useState } from "react";
import { dropdownHeaderStore } from "@store/dropdownHeaderStore";
import { FilterState } from "../interfaces/FilterState.interface";
import { defaultFilters } from "src/constants/defaultFilters";

export const useFilters = () => {
  const [filters, setFilters] = useState(defaultFilters);
  const currentGame = dropdownHeaderStore.game;

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({
      ...prev,
      [currentGame]: { ...prev[currentGame], ...newFilters },
    }));
  };

  return { filters: filters[currentGame], updateFilters };
};
