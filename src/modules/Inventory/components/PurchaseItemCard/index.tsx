import GodlyCover from "@assets/coversItem/godly.png";
import AncientsCover from "@assets/coversItem/ancients.png";
import ChromaCover from "@assets/coversItem/chroma.png";
import CorruptCover from "@assets/coversItem/corrupt.png";
import VintagesCover from "@assets/coversItem/vintages.png";
import CommonCover from "@assets/coversItem/common.png";
import LegendaryCover from "@assets/coversItem/legendary.png";
import RareCover from "@assets/coversItem/rare.png";
import UncommonCover from "@assets/coversItem/uncommon.png";
import UserItem from "@interfaces/UserItem.interface";

import styles from "./PurchaseItemCard.module.scss";

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
} as const;

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
