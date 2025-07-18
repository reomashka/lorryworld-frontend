import { observer } from "mobx-react-lite";
import { dropdownHeaderStore } from "@store/dropdownHeaderStore";
import styles from "./DropdownMenu.module.scss";

export const DropdownMenu = observer(() => {
  const store = dropdownHeaderStore;

  return (
    <div className={styles.dropdown}>
      <button className={styles.toggleButton} onClick={() => store.toggle()}>
        {store.game} ⌄
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
            onClick={() => store.select("GG")}
          >
            GG
          </li>
        </ul>
      )}
    </div>
  );
});
