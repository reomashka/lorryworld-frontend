import legendCover from "@assets/coversHome/legendary.svg";
import Item from "@modules/Home/interfaces/Item.interface";

import styles from "./ItemGrid.module.scss";

type Props = {
  items: Item[];
  onItemClick: (item: Item) => void;
};

export const ItemGrid = ({ items, onItemClick }: Props) => (
  <div className={styles.itemsGrid}>
    {items.map((item) => (
      <div
        key={item.id}
        className={styles.itemCard}
        onClick={() => onItemClick(item)}
      >
        <div className={styles.itemImage}>
          <img src={legendCover} alt={item.name} />
        </div>
        <div className={styles.itemInfo}>
          <div className={styles.itemName}>{item.name}</div>
          <div className={styles.itemPrice}>{item.price} ₽</div>
        </div>
      </div>
    ))}
  </div>
);
