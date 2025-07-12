import styles from "./Inventory.module.scss";
import { Boxes, ShieldUser } from "lucide-react";

import { useInventoryItems } from "src/hooks/useInventoryItems";
import { PurchaseItemCard } from "../PurchaseItemCard";
import { Link, useLocation } from "react-router-dom";
import { ItemGridSkeleton } from "@components/ItemGridSkeleton";

export const Inventory = () => {
  const { items, isDisabled, isLoading } = useInventoryItems();
  const location = useLocation();

  // Фильтрация товаров с status PURCHASED
  const purchasedItems = items.filter((item) => item.status === "PURCHASED");

  // Фильтрация товаров, которые либо PURCHASED, либо не выданы (isIssued === false)
  const waitingItems = items.filter(
    (item) => item.status == "WITHDRAWN" && item.isIssued === false
  );

  // Проверка, есть ли невыданные товары
  const hasNotIssued = waitingItems.some((item) => item.isIssued === false);

  return (
    <div className={styles.profilePage}>
      <main className={styles.main}>
        <div className={styles.sidebar}>
          <div className={styles.sidebarTabs}>
            <Link
              to="/withdraw"
              state={{
                backgroundLocation:
                  location.state?.backgroundLocation || location,
              }}
              onClick={(e) => {
                if (isDisabled) {
                  e.preventDefault();
                }
              }}
              className={`${styles.sidebarTab} ${isDisabled ? styles.disabled : ""}`}
            >
              <Boxes />
              Вывести все предметы
            </Link>
            {hasNotIssued && (
              <Link
                to="/claim-items"
                state={{
                  backgroundLocation:
                    location.state?.backgroundLocation || location,
                }}
                className={`${styles.sidebarTab}`}
              >
                <ShieldUser />
                Связь с админом
              </Link>
            )}
          </div>

          {/* ВЕРХ: только PURCHASED без надписи */}
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <ItemGridSkeleton key={index} />
            ))
          ) : (
            <div className={styles.purchaseGrid}>
              {purchasedItems.length > 0 ? (
                purchasedItems.map((item, index) => (
                  <PurchaseItemCard item={item} key={index} />
                ))
              ) : (
                <p className={styles.noData}>Ваш инвентарь пуст</p>
              )}
            </div>
          )}

          {/* НИЗ: товары, которые ждут выдачи + надпись */}
          {hasNotIssued && <p className={styles.notIssuedItems}>Ждут выдачи</p>}

          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <ItemGridSkeleton key={index} />
              ))
            : hasNotIssued && (
                <>
                  <div className={styles.purchaseGrid}>
                    {waitingItems.map((item, index) => (
                      <PurchaseItemCard item={item} key={"waiting-" + index} />
                    ))}
                  </div>
                </>
              )}
        </div>
      </main>
    </div>
  );
};
