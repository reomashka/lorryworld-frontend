import { useState } from "react";
import { ChevronRight } from "lucide-react";
import styles from "./FilterRarity.module.scss";
import { dropdownHeaderStore } from "@store/dropdownHeaderStore";
import { rarityOptions } from "src/constants/rarityOptions";

type Props = {
  selectedRarities: string[];
  setSelectedRarities: (rarities: string[]) => void;
};

export const FilterRarity = ({
  selectedRarities,
  setSelectedRarities,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedGame = dropdownHeaderStore.game;

  const toggleOption = (id: string) => {
    if (selectedRarities.includes(id)) {
      setSelectedRarities(selectedRarities.filter((r) => r !== id));
    } else {
      setSelectedRarities([...selectedRarities, id]);
    }
  };

  const getButtonText = () => {
    const count = selectedRarities.length;
    if (count === 0) return "Показать все";
    if (count === rarityOptions[selectedGame].length) return "Выбраны все";
    return `Выбрано: ${count}`;
  };

  return (
    <div
      className={`${styles.filterSection} ${styles[`_${selectedGame}`] || ""}`}
    >
      <div className={styles.rarityFilter_container}>
        <h3 className={styles.rarityFilter_title}>Редкость</h3>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={styles.rarityFilter_toggleButton}
        >
          <span>{getButtonText()}</span>
          <ChevronRight
            className={`${styles.rarityFilter_chevron} ${
              isOpen ? styles.rarityFilter_chevron__open : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className={styles.rarityFilter_dropdown}>
            {rarityOptions[selectedGame].map((option) => {
              const isSelected = selectedRarities.includes(option.id);
              return (
                <div
                  key={option.id}
                  className={`${styles.rarityFilter_option} ${
                    isSelected ? styles.rarityFilter_option__selected : ""
                  }`}
                  onClick={() => toggleOption(option.id)}
                >
                  <div
                    className={`${styles.rarityFilter_colorIndicator} ${
                      styles[option.colorClass]
                    }`}
                  ></div>
                  <span className={styles.rarityFilter_option__name}>
                    {option.name}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
