import { Item } from "@sharedTypes/item.interface";
import rarityItemMap from "@/constants/rarityItemMap";
import styles from "./ItemCard.module.scss";

import MFR from "@assets/propertiesAM/MFR.svg";
import NFR from "@assets/propertiesAM/NFR.svg";
import FR from "@assets/propertiesAM/FR.svg";

const propertiesMap = {
  MFR: MFR,
  NFR: NFR,
  FR: FR,
} as const;

export const ItemCard = ({
  item,
  onClick,
}: {
  item: Item;
  onClick: (item: Item) => void;
}) => {
  const gameKey = item.game;
  const rarityKey = item.rarity as keyof (typeof rarityItemMap)[typeof gameKey];

  return (
    <div className={styles.itemCard} onClick={() => onClick(item)}>
      <div className={styles.itemImage}>
        <img
          src={`/uploads/${item.icon}.webp`}
          alt={item.name}
          loading="lazy"
        />

        <img src={rarityItemMap[gameKey][rarityKey]} alt={item.name} />

        {item.property && item.property !== "noPotion" && (
          <img
            src={propertiesMap[item.property as keyof typeof propertiesMap]}
            alt={item.property}
            className={styles.property}
          />
        )}
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
};
