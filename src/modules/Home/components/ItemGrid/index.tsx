import GodlyCover from "@assets/coversItem/godly.png";
import AncientsCover from "@assets/coversItem/ancients.png";
import ChromaCover from "@assets/coversItem/chroma.png";
import CorruptCover from "@assets/coversItem/corrupt.png";
import VintagesCover from "@assets/coversItem/vintages.png";
import CommonCover from "@assets/coversItem/common.png";
import LegendaryCover from "@assets/coversItem/legendary.png";
import RareCover from "@assets/coversItem/rare.png";
import UncommonCover from "@assets/coversItem/uncommon.png";
import BlueCover from "@assets/coversItem/blue.png";

import React from "react";

import { Item } from "@interfaces/Item.interface";

import styles from "./ItemGrid.module.scss";
import { dropdownHeaderStore } from "@store/dropdownHeaderStore";
import { observer } from "mobx-react-lite";

type Props = {
  items: Item[];
  onItemClick: (item: Item) => void;
};

const rarityItemMap = {
  Vintages: VintagesCover,
  Godly: GodlyCover,
  Chroma: ChromaCover,
  Ancients: AncientsCover,
  Corrupt: CorruptCover,
  Common: CommonCover,
  Legendary: LegendaryCover,
  Rare: RareCover,
  Uncommon: UncommonCover,
  Blue: BlueCover,
} as const;

const rarityOrder: Record<string, number> = {
  Ancients: 1,
  Corrupt: 2,
  Godly: 3,
  Chroma: 4,
  Vintages: 5,
  Legendary: 6,
  Rare: 7,
  Uncommon: 8,
  Common: 9,
  Blue: 10,
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
          <img
            src={`/uploads/${item.icon}.webp`}
            alt={item.name}
            loading="lazy"
          />
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
