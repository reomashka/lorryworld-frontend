import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Sidebar } from "@components/Sidebar";

import { SearchBar } from "../SearchBar";
import { ItemGrid } from "../ItemGrid";

import { useFilteredItems } from "@modules/Home/components/useFilteredItems";
import FilterState from "@modules/Home/interfaces/FilterState.interface";

import styles from "./Home.module.scss";
import { useProfile } from "src/hooks/useProfile";

export const Home = () => {
  const { data: user, isLoading, isError } = useProfile();

  const [filters, setFilters] = useState<FilterState>({
    selectedTypes: ["Ножи", "Пистолеты", "Сеты", "Петы"],
    minPrice: 0,
    maxPrice: 0,
    searchTerm: "",
  });

  const filteredItems = useFilteredItems(filters);
  const navigate = useNavigate();
  const location = useLocation();

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Вы не авторизованы</div>;
  return (
    <div className={styles.storeContent}>
      <h1>Добро пожаловать, {user.displayName}</h1>
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
            navigate(`/item`, {
              state: {
                backgroundLocation: location,
                item,
              },
            });
          }}
        />
      </main>
    </div>
  );
};
