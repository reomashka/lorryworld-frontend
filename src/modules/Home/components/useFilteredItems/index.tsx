import { FilterState } from "@modules/Home/interfaces/FilterState.interface";
import { fetchItems } from "src/api/fetchItems";
import { Item } from "@interfaces/Item.interface";

import { useQuery } from "@tanstack/react-query";

export const useFilteredItems = (filters: FilterState) => {
  const { data: items = [] } = useQuery({
    queryKey: ["items"],
    queryFn: fetchItems,
    staleTime: 1000 * 60 * 5,
  });

  const filteredItems = items.filter((item: Item) => {
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

  // 👇 применяем сортировку
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (filters.selectedSort === "cheaper") {
      return a.price - b.price;
    } else if (filters.selectedSort === "expensive") {
      return b.price - a.price;
    } else {
      return 0; // стандартная сортировка
    }
  });

  return sortedItems;
};
