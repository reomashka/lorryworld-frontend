import sort from "@assets/svg/sort.svg";
import sortStandart from "@assets/svg/sortStandart.svg";
import expensiveSort from "@assets/svg/expensiveSort.svg";
import cheaperSort from "@assets/svg/cheaperSort.svg";
import settings from "@assets/svg/settings.svg";
import { Search } from "lucide-react";

import { useSidebar } from "src/hooks/contexts/SidebarContext";

import styles from "./SearchBar.module.scss";
import { useEffect, useRef, useState } from "react";

interface SortOption {
  id: string;
  label: string;
  icon?: string;
}

const sortOptions: SortOption[] = [
  { id: "standard", label: "По стандарту", icon: sortStandart },
  { id: "cheaper", label: "Дешевле", icon: cheaperSort },
  { id: "expensive", label: "Дороже", icon: expensiveSort },
];

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const { toggleSidebar } = useSidebar();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(sortOptions[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Закрытие меню при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: SortOption) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.searchBar}>
      <div className={styles.searchInput}>
        <span className={styles.searchIcon}>
          <Search />
        </span>
        <input
          type="text"
          placeholder="Поиск"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className={styles.sortControls} ref={dropdownRef}>
        <button className={styles.sortButton}>
          <span>
            <img src={sort} width={27} alt="Sort" />
          </span>
        </button>

        <div className={styles.dropdown}>
          <button className={styles.sortButton_standart} onClick={handleToggle}>
            <span>
              <img src={selectedOption.icon} alt="Sort standard" />
            </span>
            {selectedOption.label}
            <span
              className={`${styles.arrow} ${isOpen ? styles.arrow_open : ""}`}
            >
              ▼
            </span>
          </button>

          {isOpen && (
            <div className={styles.dropdownMenu}>
              {sortOptions.map((option) => (
                <button
                  key={option.id}
                  className={`${styles.dropdownItem} ${
                    selectedOption.id === option.id
                      ? styles.dropdownItem_active
                      : ""
                  }`}
                  onClick={() => handleOptionSelect(option)}
                >
                  <span>
                    <img src={option.icon} width={16} alt={option.label} />
                  </span>
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <button className={styles.settings} onClick={toggleSidebar}>
          <img src={settings} alt="settings" />
        </button>
      </div>
    </div>
  );
};
