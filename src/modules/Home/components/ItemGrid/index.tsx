import legendCover from "@assets/coversHome/legendary.png";
import Item from "@modules/Home/interfaces/Item.interface";

import styles from "./ItemGrid.module.scss";

import sword from "@assets/itemsHome/sword.png";

type Props = {
  items: Item[];
  onItemClick: (item: Item) => void;
};

export const ItemGrid = ({ items, onItemClick }: Props) => {
  const filterItems = [...items].sort(
    (a, b) => Number(a.price) - Number(b.price)
  );

  return (
    <div className={styles.itemsGrid}>
      {filterItems.map((item) => (
        <div
          key={item.id}
          className={styles.itemCard}
          onClick={() => onItemClick(item)}
        >
          <div className={styles.itemImage}>
            <img src={sword} alt="" />
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
};
