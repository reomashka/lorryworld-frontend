import React from "react";

import { Item } from "@sharedTypes/item.interface";

import styles from "./ItemGrid.module.scss";
import { dropdownHeaderStore } from "@store/dropdownHeaderStore";
import { observer } from "mobx-react-lite";

import rarityItemMap from "src/constants/rarityItemMap";
import rarityOrder from "src/constants/rarityOrder";

type Props = {
  items: Item[];
  onItemClick: (item: Item) => void;
};

type RarityKey = keyof typeof rarityItemMap;

const ItemCard = React.memo(
  ({ item, onClick }: { item: Item; onClick: (item: Item) => void }) => {
    return (
      <div
        className={styles.itemCard}
        onClick={() => onClick(item)}
        key={item.id}
      >
        <div className={styles.itemImage}>
          <picture>
            <source srcSet={`/uploads/${item.icon}.webp`} type="image/webp" />
            <img
              src={`/uploads/${item.icon}.jpg`}
              alt={item.name}
              loading="lazy"
            />
          </picture>

          <img src={rarityItemMap[item.rarity as RarityKey]} alt={item.name} />
        </div>

        <div className={styles.itemInfo}>
          <div className={styles.itemName}>{item.name}</div>
          <div className={styles.priceWrapper}>
            {item.sale > 0 ? (
              <>
                <div className={styles.oldPrice}>{item.price} ₽</div>
                <div className={styles.newPrice}>{item.sale} ₽</div>
              </>
            ) : (
              <div className={styles.itemPrice}>{item.price} ₽</div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export const ItemGrid = observer(({ items, onItemClick }: Props) => {
  const filterItems = [...items].sort(
    (a, b) => rarityOrder[a.rarity] - rarityOrder[b.rarity]
  );

  return (
    <div className={styles.itemsGrid}>
      {filterItems
        .filter((item) => item.game === dropdownHeaderStore.game)

        .map((item) => (
          <ItemCard key={item.id} item={item} onClick={onItemClick} />
        ))}
    </div>
  );
});
