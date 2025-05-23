import { useState } from "react";

import styles from "./Home.module.scss";

import { Sidebar } from "@components/Sidebar";
import { ItemModal } from "@components/ItemModal";

import Item from "@modules/Home/interfaces/Item.interface";
import FilterState from "@modules/Home/interfaces/FilterState.interface";
import { useFilteredItems } from "@modules/Home/components/useFilteredItems";
import { ItemGrid } from "../ItemGrid";
import { SearchBar } from "../SearchBar";

export const Home = () => {
  const [filters, setFilters] = useState<FilterState>({
    selectedTypes: ["Ножи", "Пистолеты", "Сеты", "Петы"],
    minPrice: 0,
    maxPrice: 0,
    searchTerm: "",
  });
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const filteredItems = useFilteredItems(filters);

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.storeContent}>
      <Sidebar
        selectedTypes={filters.selectedTypes}
        setSelectedTypes={(types) => updateFilters({ selectedTypes: types })}
        minPrice={filters.minPrice}
        setMinPrice={(price) => updateFilters({ minPrice: price })}
        maxPrice={filters.maxPrice}
        setMaxPrice={(price) => updateFilters({ maxPrice: price })}
      />

      <main className={styles.itemsDisplay}>
        <SearchBar
          searchTerm={filters.searchTerm}
          setSearchTerm={(term) => updateFilters({ searchTerm: term })}
        />

        <ItemGrid
          items={filteredItems}
          onItemClick={(item) => {
            setIsModalOpen(true);
            setSelectedItem(item);
          }}
        />
        {selectedItem && (
          <ItemModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            item={selectedItem}
          />
        )}
      </main>
    </div>
  );
};
