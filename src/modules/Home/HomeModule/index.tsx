/**
 * Главный компонент модуля Home.
 * Импорт через `@/modules/Home`.
 */

import { Sidebar } from "@components/Sidebar";

import { SearchBar } from "../components/SearchBar";
import { ItemGrid } from "../components/ItemGrid";

import { useFilteredItems } from "@modules/Home/hooks/useFilteredItems";

import styles from "./Home.module.scss";
import { ItemGridSkeleton } from "@components/ItemGridSkeleton";

import { useFilters } from "../hooks/useFilters";
import { observer } from "mobx-react-lite";
import { ItemModal } from "@modals/ItemModal";
import { useState } from "react";
import { Item } from "@sharedTypes/item.interface";

export const Home = observer(() => {
  const { filters, updateFilters } = useFilters();
  const { items, isLoading } = useFilteredItems(filters);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

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
        selectedProperties={filters.selectedProperties ?? []}
        setSelectedProperties={(props) =>
          updateFilters({ selectedProperties: props })
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
            onItemClick={(item) => setSelectedItem(item)}
          />
        ) : (
          Array.from({ length: 12 }).map((_, idx) => (
            <ItemGridSkeleton key={idx} />
          ))
        )}

        {selectedItem && (
          <ItemModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </main>
    </div>
  );
});
