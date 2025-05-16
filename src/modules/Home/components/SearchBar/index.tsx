import sort from "@assets/svg/sort.svg";
import sortStandart from "@assets/svg/sortStandart.svg";
import { Search } from "lucide-react";

import styles from "./SearchBar.module.scss";

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

  return (
    <div className={styles.searchBar}>
      <div className={styles.searchInput}>
        <span className={styles.searchIcon}>
          <Search />
        </span>
        <input
          type="text"
          placeholder="Поиск..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className={styles.sortControls}>
        <button className={styles.sortButton}>
          <span>
            <img src={sort} width={27} />
          </span>
        </button>
        <button className={styles.sortButton_standart}>
          <span>
            <img src={sortStandart} />
          </span>
          По стандарту
        </button>
      </div>
    </div>
  );
};
