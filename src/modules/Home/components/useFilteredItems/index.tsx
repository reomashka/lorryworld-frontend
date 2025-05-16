import { useMemo } from "react";
import { items } from "@mocks/items";
import FilterState from "@modules/Home/interfaces/FilterState.interface";

export const useFilteredItems = (filters: FilterState) => {
  return useMemo(() => {
    return items.filter((item) => {
      const matchesType = filters.selectedTypes.includes(item.type);
      const matchesMinPrice =
        filters.minPrice === 0 || item.price >= filters.minPrice;
      const matchesMaxPrice =
        filters.maxPrice === 0 || item.price <= filters.maxPrice;
      const matchesSearchTerm = item.name
        .toLowerCase()
        .includes(filters.searchTerm.toLowerCase());

      return (
        matchesType && matchesMinPrice && matchesMaxPrice && matchesSearchTerm
      );
    });
  }, [filters]);
};
