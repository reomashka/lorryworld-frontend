import UserItem from "@types/userItem.interface";
import rarityItemMap from "src/constants/rarityItemMap";

import styles from "./PurchaseItemCard.module.scss";

type RarityKey = keyof typeof rarityItemMap;

export const PurchaseItemCard = ({ item }: { item: UserItem }) => (
  <div className={styles.purchaseItem}>
    <div className={styles.itemImage}>
      <img src={`/uploads/${item.item.icon}.webp`} alt="" />
      <img
        src={rarityItemMap[item.item.rarity as RarityKey]}
        alt={item.item.name}
      />
    </div>
    <div className={styles.purchaseItemInfo}>
      <div className={styles.purchaseItemName}>{item.item.name}</div>
      <div className={styles.purchaseItemPrice}>{item.quantity} шт</div>
    </div>
  </div>
);
