import { useEffect, useState } from "react";
import { FilterState } from "@modules/Home/interfaces/FilterState.interface";
import { fetchItems } from "src/api/fetchItems";
import { Item } from "../../interfaces/Item.interface";

export const useFilteredItems = (filters: FilterState) => {
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);

  useEffect(() => {
    const loadAndFilterItems = async () => {
      const items = await fetchItems();

      const result = items.filter((item: Item) => {
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

      setFilteredItems(result);
    };

    loadAndFilterItems();
  }, [filters]);

  return filteredItems;
};
