/**
 * Главный компонент модуля Home.
 * Импорт через `@/modules/Home`.
 */

import { useNavigate, useLocation } from "react-router-dom";

import { Sidebar } from "@components/Sidebar";

import { SearchBar } from "../SearchBar";
import { ItemGrid } from "../ItemGrid";

import { useFilteredItems } from "@modules/Home/hooks/useFilteredItems";

import styles from "./Home.module.scss";
import { ItemGridSkeleton } from "@components/ItemGridSkeleton";

import { useFilters } from "../../hooks/useFilters";

export const Home = () => {
  const { filters, updateFilters } = useFilters();
  const { items, isLoading } = useFilteredItems(filters);

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={styles.storeContent}>
      <Sidebar
        selectedTypes={filters.selectedTypes}
        setSelectedTypes={(types) => updateFilters({ selectedTypes: types })}
        minPrice={filters.minPrice}
        setMinPrice={(price) => updateFilters({ minPrice: price })}
        maxPrice={filters.maxPrice}
        setMaxPrice={(price) => updateFilters({ maxPrice: price })}
        selectedRarities={filters.selectedRarities}
        setSelectedRarities={(rarities) =>
          updateFilters({ selectedRarities: rarities })
        }
      />

      <main className={styles.itemsDisplay}>
        <SearchBar
          searchTerm={filters.searchTerm}
          setSearchTerm={(term) => updateFilters({ searchTerm: term })}
          selectedSort={filters.selectedSort}
          setSelectedSort={(selectedSort) => updateFilters({ selectedSort })}
        />
        {!isLoading ? (
          <ItemGrid
            items={items}
            onItemClick={(item) => {
              navigate(`/item`, {
                state: {
                  backgroundLocation: location,
                  item,
                },
              });
            }}
          />
        ) : (
          Array.from({ length: 12 }).map((_, idx) => (
            <ItemGridSkeleton key={idx} />
          ))
        )}
      </main>
    </div>
  );
};
