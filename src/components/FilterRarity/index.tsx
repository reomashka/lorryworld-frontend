import { useState } from "react";
import { ChevronRight } from "lucide-react";
import styles from "./FilterRarity.module.scss";

type RarityOption = {
  id: string;
  name: string;
  colorClass: string;
};

export function FilterRarity() {
  const rarityOptions: RarityOption[] = [
    { id: "chroma", name: "Chroma", colorClass: "color-chroma" },
    { id: "ancients", name: "Ancients", colorClass: "color-ancients" },
    { id: "godly", name: "Godly", colorClass: "color-godly" },
    { id: "vintages", name: "Vintages", colorClass: "color-vintages" },
    { id: "corrupt", name: "Corrupt", colorClass: "color-corrupt" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    rarityOptions.map((option) => option.id)
  );

  const toggleOption = (id: string) => {
    setSelectedOptions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getButtonText = () => {
    if (selectedOptions.length === 0) return "Показать все";
    if (selectedOptions.length === rarityOptions.length) return "Выбраны все";
    return `Выбрано: ${selectedOptions.length}`;
  };

  return (
    <div className={styles.filterSection}>
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
            {rarityOptions.map((option) => {
              const isSelected = selectedOptions.includes(option.id);
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
}
