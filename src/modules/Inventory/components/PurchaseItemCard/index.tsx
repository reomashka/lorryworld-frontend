import UserItem from "@sharedTypes/userItem.interface";
import rarityItemMap from "@/constants/rarityItemMap";

import styles from "./PurchaseItemCard.module.scss";

export const PurchaseItemCard = ({ item }: { item: UserItem }) => {
  const gameKey = item.item.game;
  const rarityKey = item.item
    .rarity as keyof (typeof rarityItemMap)[typeof gameKey];

  return (
    <div className={styles.purchaseItem}>
      <div className={styles.itemImage}>
        <img src={`/uploads/${item.item.icon}.webp`} alt="" />
        <img src={rarityItemMap[gameKey][rarityKey]} alt={item.item.name} />
      </div>
      <div className={styles.purchaseItemInfo}>
        <div className={styles.purchaseItemName}>{item.item.name}</div>
        <div className={styles.purchaseItemPrice}>{item.quantity} шт</div>
      </div>
    </div>
  );
};
