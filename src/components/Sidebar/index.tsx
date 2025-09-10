import { observer } from "mobx-react-lite";
import { FilterRarity } from "../FilterRarity";

import styles from "./Sidebar.module.scss";

import { dropdownHeaderStore } from "@store/dropdownHeaderStore";
import { sidebarStore } from "@store/sidebarStore";
import { typeLabels } from "src/constants/typeLabels";
import { propertyLabels } from "src/constants/propertyLabels";

interface SidebarProps {
  selectedTypes: string[];
  setSelectedTypes: (types: string[]) => void;
  minPrice: number | undefined;
  setMinPrice: (value: number) => void;
  maxPrice: number | undefined;
  setMaxPrice: (value: number) => void;
  selectedRarities: string[];
  setSelectedRarities: (types: string[]) => void;
  selectedProperties?: string[];
  setSelectedProperties?: (types: string[]) => void;
}

export const Sidebar = observer(
  ({
    selectedTypes,
    setSelectedTypes,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    selectedRarities,
    setSelectedRarities,
    selectedProperties,
    setSelectedProperties,
  }: SidebarProps) => {
    const toggleType = (type: string) => {
      if (selectedTypes.includes(type)) {
        setSelectedTypes(selectedTypes.filter((t) => t !== type));
      } else {
        setSelectedTypes([...selectedTypes, type]);
      }
    };

    const toggleProperty = (property: string) => {
      if (!selectedProperties || !setSelectedProperties) return;
      if (selectedProperties.includes(property)) {
        setSelectedProperties(selectedProperties.filter((t) => t !== property));
      } else {
        setSelectedProperties([...selectedProperties, property]);
      }
    };

    const { isOpenSidebar, toggleSidebar } = sidebarStore;
    const selectedGame = dropdownHeaderStore.game;
    const showProperties =
      selectedGame === "AM" && selectedProperties && setSelectedProperties;

    return (
      <aside
        className={`${styles.filters} ${isOpenSidebar ? styles.open : ""} ${
          styles[`_${selectedGame}`] || ""
        }`}
      >
        <button className={styles.closeButton} onClick={toggleSidebar}>
          ×
        </button>

        <div className={styles.filterSection}>
          <h3>Цена</h3>
          <div className={styles.priceInputs}>
            <div className={styles.priceInput}>
              <span className={styles.currencySymbol}>₽</span>
              <input
                type="text"
                value={minPrice ?? ""}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*\.?\d*$/.test(value)) {
                    setMinPrice(Number(value));
                  }
                }}
                placeholder="Минимальная цена"
              />
            </div>
            <div className={styles.priceInput}>
              <span className={styles.currencySymbol}>₽</span>
              <input
                type="text"
                placeholder="0.00"
                value={maxPrice ?? ""}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*\.?\d*$/.test(value)) {
                    setMaxPrice(Number(value));
                  }
                }}
              />
            </div>
          </div>
        </div>

        {showProperties && (
          <div className={styles.filterSection}>
            <h3>Свойства</h3>
            <div className={styles.typeCheckboxes}>
              {propertyLabels[selectedGame] &&
                Object.entries(propertyLabels[selectedGame]).map(
                  ([type, label]) => (
                    <label className={styles.checkboxLabel} key={type}>
                      <input
                        type="checkbox"
                        checked={selectedProperties.includes(type)}
                        onChange={() => toggleProperty(type)}
                      />
                      <span className={styles.customCheckbox}></span>
                      {label}
                    </label>
                  )
                )}
            </div>
          </div>
        )}

        <div className={styles.filterSection}>
          <h3>Тип</h3>
          <div className={styles.typeCheckboxes}>
            {Object.entries(typeLabels[selectedGame]).map(([type, label]) => (
              <label className={styles.checkboxLabel} key={type}>
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => toggleType(type)}
                />
                <span className={styles.customCheckbox}></span>
                {label}
              </label>
            ))}
          </div>
        </div>

        <div>
          <FilterRarity
            selectedRarities={selectedRarities}
            setSelectedRarities={setSelectedRarities}
          />
        </div>
      </aside>
    );
  }
);
