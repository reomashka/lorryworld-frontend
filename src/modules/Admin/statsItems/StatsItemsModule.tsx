import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchStatsOfItems as fetchStatsOfItemsApi } from "src/api/fetchStatsOfItems";
import styles from "./StatsItemsModule.module.scss";
import { dropdownHeaderStore } from "@store/dropdownHeaderStore";
import { observer } from "mobx-react-lite";

interface Item {
  itemId: number;
  itemName: string;
  totalQuantity: number;
  game: string;
}

type Period = "day" | "week" | "all";

export const StatsItemsModule = observer(() => {
  const [period, setPeriod] = useState<Period>("day");

  const { data, isLoading, error } = useQuery({
    queryKey: ["stats-items", period],
    queryFn: () => fetchStatsOfItemsApi(period),
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Статистика продаж товаров</h2>
        <div className={styles.periodButtons}>
          <button
            className={`${styles.periodButton} ${
              period === "day" ? styles.active : ""
            }`}
            onClick={() => setPeriod("day")}
          >
            День
          </button>
          <button
            className={`${styles.periodButton} ${
              period === "week" ? styles.active : ""
            }`}
            onClick={() => setPeriod("week")}
          >
            Неделя
          </button>
          <button
            className={`${styles.periodButton} ${
              period === "all" ? styles.active : ""
            }`}
            onClick={() => setPeriod("all")}
          >
            Всё время
          </button>
        </div>
      </div>

      {isLoading && (
        <div className={styles.loading}>Загрузка статистики...</div>
      )}

      {error && <div className={styles.error}>Ошибка загрузки данных</div>}

      {!isLoading && !error && (
        <>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead className={styles.tableHead}>
                <tr>
                  <th className={styles.tableHeader}>ID</th>
                  <th className={styles.tableHeader}>Наименование товара</th>
                  <th className={styles.tableHeader}>Игра</th>
                  <th className={styles.tableHeader}>Количество</th>
                </tr>
              </thead>
              <tbody className={styles.tableBody}>
                {data
                  ?.filter(
                    (item: Item) => item.game === dropdownHeaderStore.game
                  )
                  .map((item: Item) => (
                    <tr key={item.itemId} className={styles.tableRow}>
                      <td className={styles.tableCell}>{item.itemId}</td>
                      <td className={styles.tableCell}>{item.itemName}</td>
                      <td className={styles.tableCell}>{item.game}</td>
                      <td className={styles.tableCell}>
                        <span className={styles.quantity}>
                          {item.totalQuantity} шт.
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {data && data.length === 0 && (
            <div className={styles.emptyState}>Нет данных для отображения</div>
          )}
        </>
      )}
    </div>
  );
});
