import styles from "./Inventory.module.scss";
import { Boxes } from "lucide-react";
import cover from "@assets/coversItem/ancients.png";

export const Inventory = () => {
  return (
    <div className={styles.profilePage}>
      <main className={styles.main}>
        <div className={styles.sidebar}>
          <div className={styles.sidebarTabs}>
            <button
              className={`${styles.sidebarTab} ${styles.sidebarTabActive}`}
            >
              <Boxes />
              Вывести все предметы
            </button>
          </div>
          <div className={styles.purchaseGrid}>
            {Array(12)
              .fill(0)
              .map((_, index) => (
                <div className={styles.purchaseItem} key={index}>
                  <img src={cover} alt="" />
                  <div className={styles.purchaseItemInfo}>
                    <div className={styles.purchaseItemName}>
                      Chroma Lightbringer
                    </div>
                    <div className={styles.purchaseItemPrice}>1 шт</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
};
