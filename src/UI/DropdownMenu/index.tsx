import { observer } from "mobx-react-lite";
import { dropdownHeaderStore } from "@store/dropdownHeaderStore";
import styles from "./DropdownMenu.module.scss";

export const DropdownMenu = observer(() => {
  const store = dropdownHeaderStore;

  return (
    <div className={styles.dropdown}>
      <button className={styles.toggleButton} onClick={() => store.toggle()}>
        {store.game}
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
            MM2
          </li>
          <li
            className={styles.dropdownItem}
            onClick={() => store.select("GAG")}
          >
            GAG
          </li>
        </ul>
      )}
    </div>
  );
});
