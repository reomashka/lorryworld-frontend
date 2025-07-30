import { FilterState } from "@modules/Home/interfaces/FilterState.interface";
import { fetchItems } from "src/api/fetchItems";
import { Item } from "@interfaces/Item.interface";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const useFilteredItems = (filters: FilterState) => {
  const {
    data: items = [],
    isLoading,
    isError,
    error,
  } = useQuery<Item[]>({
    queryKey: ["items"],
    queryFn: fetchItems,
    staleTime: 1000 * 60 * 5,
  });

  const filteredAndSortedItems = useMemo(() => {
    const filtered = items.filter((item) => {
      const matchesType = filters.selectedTypes.includes(item.type);
      const matchesMinPrice =
        filters.minPrice === 0 || item.price >= filters.minPrice;
      const matchesMaxPrice =
        filters.maxPrice === 0 || item.price <= filters.maxPrice;
      const matchesSearchTerm = item.name
        .toLowerCase()
        .includes(filters.searchTerm.toLowerCase());
      const matchesRarity =
        filters.selectedRarities.length === 0 ||
        filters.selectedRarities.includes(item.rarity.toLowerCase());

      return (
        matchesType &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesSearchTerm &&
        matchesRarity
      );
    });

    return filtered.sort((a, b) => {
      if (filters.selectedSort === "cheaper") return a.price - b.price;
      if (filters.selectedSort === "expensive") return b.price - a.price;
      return 0;
    });
  }, [items, filters]);

  return {
    items: filteredAndSortedItems,
    isLoading,
    isError,
    error,
  };
};
