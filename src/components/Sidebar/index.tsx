// import character from "../../assets/charachter.svg";
import { observer } from "mobx-react-lite";
import { FilterRarity } from "../FilterRarity";

import styles from "./Sidebar.module.scss";

import { useSidebar } from "src/hooks/contexts/SidebarContext";
import { dropdownHeaderStore } from "@store/dropdownHeaderStore";

const typeLabels: Record<string, Record<string, string>> = {
  MM: {
    KNIFE: "Ножи",
    PISTOL: "Пистолеты",
    SET: "Сеты",
    PET: "Петы",
  },
  GAG: {
    FRUITS: "Fruits",
    GIANTPETS: "Giant Pets",
    PET: "Pets",
    BUNDLES: "Bundles",
  },
};

interface SidebarProps {
  selectedTypes: string[];
  setSelectedTypes: (types: string[]) => void;
  minPrice: number | undefined;
  setMinPrice: (value: number) => void;
  maxPrice: number | undefined;
  setMaxPrice: (value: number) => void;
  selectedRarities: string[];
  setSelectedRarities: (types: string[]) => void;
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
  }: SidebarProps) => {
    const toggleType = (type: string) => {
      if (selectedTypes.includes(type)) {
        setSelectedTypes(selectedTypes.filter((t) => t !== type));
      } else {
        setSelectedTypes([...selectedTypes, type]);
      }
    };

    const { isOpenSidebar, toggleSidebar } = useSidebar();

    const selectedGame = dropdownHeaderStore.game;

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
                  // Разрешаем только цифры и точку
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
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        <div className={styles.filterSection}>
          <h3>Тип</h3>
          <div className={styles.typeCheckboxes}>
            {Object.entries(typeLabels[selectedGame] || {}).map(
              ([type, label]) => (
                <label className={styles.checkboxLabel} key={type}>
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() => toggleType(type)}
                  />
                  <span className={styles.customCheckbox}></span>
                  {label}
                </label>
              )
            )}
          </div>
        </div>

        <div>
          <FilterRarity
            selectedRarities={selectedRarities}
            setSelectedRarities={setSelectedRarities}
          />
        </div>

        {/* <div className="character-display">
        <img src={character} alt="Game character" className="character-image" />
      </div> */}
      </aside>
    );
  }
);
