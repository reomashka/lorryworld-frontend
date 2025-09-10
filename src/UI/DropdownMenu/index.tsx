import { observer } from "mobx-react-lite";
import { dropdownHeaderStore } from "@store/dropdownHeaderStore";

import GAG from "@assets/svg/GAG.svg";
import MM from "@assets/MM.webp";
import AM from "@assets/AM.svg";
import styles from "./DropdownMenu.module.scss";

export const DropdownMenu = observer(() => {
  const store = dropdownHeaderStore;

  const games = {
    MM: "MM2",
    GAG: "GROW A GARDEN",
    AM: "ADOPT ME",
  };

  const gameIcons = {
    MM,
    GAG,
    AM,
  };

  return (
    <div className={styles.dropdown}>
      <button className={styles.toggleButton} onClick={() => store.toggle()}>
        <img className={styles.iconBadge} src={gameIcons[store.game]} alt="" />{" "}
        <span>{games[store.game]}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {store.isOpen && (
        <ul className={styles.dropdownList}>
          <li
            className={styles.dropdownItem}
            onClick={() => store.select("MM")}
          >
            <img className={styles.icon} src={MM} alt="" /> MM2
          </li>
          <li
            className={styles.dropdownItem}
            onClick={() => store.select("GAG")}
          >
            <img className={styles.icon} src={GAG} alt="" /> GROW A GARDEN
          </li>{" "}
          <li
            className={styles.dropdownItem}
            onClick={() => store.select("AM")}
          >
            <img className={styles.icon} src={AM} alt="" /> ADOPT ME
          </li>
        </ul>
      )}
    </div>
  );
});
