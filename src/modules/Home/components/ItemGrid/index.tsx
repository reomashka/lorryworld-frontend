import GodlyCover from "@assets/coversItem/godly.png";
import AncientsCover from "@assets/coversItem/ancients.png";
import ChromaCover from "@assets/coversItem/ancients.png";
import CorruptCover from "@assets/coversItem/ancients.png";
import VintagesCover from "@assets/coversItem/ancients.png";

import { Item } from "@modules/Home/interfaces/Item.interface";

import styles from "./ItemGrid.module.scss";
// import sword from "@assets/itemsHome/sword.png";

type Props = {
  items: Item[];
  onItemClick: (item: Item) => void;
};

const rarityItemMap = {
  Godly: GodlyCover,
  Chroma: ChromaCover,
  Ancients: AncientsCover,
  Corrupt: CorruptCover,
  Vintages: VintagesCover,
} as const;

type RarityKey = keyof typeof rarityItemMap;

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
            <img
              src={`http://localhost:3000/uploads/${item.icon}.webp`}
              alt=""
            />

            <img
              src={rarityItemMap[item.rarity as RarityKey]}
              alt={item.name}
            />
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
