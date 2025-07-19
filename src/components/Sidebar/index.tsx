// import character from "../../assets/charachter.svg";
import { observer } from "mobx-react-lite";
import { FilterRarity } from "../FilterRarity";

import styles from "./Sidebar.module.scss";

import { useSidebar } from "src/hooks/contexts/SidebarContext";
import { dropdownHeaderStore } from "@store/dropdownHeaderStore";

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
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={selectedTypes.includes("KNIFE")}
                onChange={() => toggleType("KNIFE")}
              />
              <span className={styles.customCheckbox}></span>
              Ножи
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={selectedTypes.includes("PISTOL")}
                onChange={() => toggleType("PISTOL")}
              />
              <span className={styles.customCheckbox}></span>
              Пистолеты
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={selectedTypes.includes("SET")}
                onChange={() => toggleType("SET")}
              />
              <span className={styles.customCheckbox}></span>
              Сеты
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={selectedTypes.includes("PET")}
                onChange={() => toggleType("PET")}
              />
              <span className={styles.customCheckbox}></span>
              Петы
            </label>
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
