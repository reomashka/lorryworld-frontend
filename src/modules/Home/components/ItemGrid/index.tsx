import { Item } from "@sharedTypes/item.interface";

import styles from "./ItemGrid.module.scss";
import { dropdownHeaderStore } from "@store/dropdownHeaderStore";
import { observer } from "mobx-react-lite";

import rarityOrder from "src/constants/rarityOrder";
import { ItemCard } from "@modules/Home/components/ItemCard";

type Props = {
  items: Item[];
  onItemClick: (item: Item) => void;
};

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
