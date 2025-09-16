import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchStatsOfItems as fetchStatsOfItemsApi } from "@api/fetchStatsOfItems";
import styles from "./StatsItemsModule.module.scss";
import { dropdownHeaderStore } from "@store/dropdownHeaderStore";
import { observer } from "mobx-react-lite";

export interface ItemStats {
  itemId: number;
  itemName: string;
  totalQuantity: number;
  totalEarning: number;
  game: string;
}

type Period = "day" | "week" | "all";

export const StatsItemsModule = observer(() => {
  const [period, setPeriod] = useState<Period>("day");
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, error } = useQuery<ItemStats[]>({
    queryKey: ["stats-items", period],
    queryFn: () => fetchStatsOfItemsApi(period),
  });

  // Фильтрация по игре и по названию предмета
  const filteredData = Array.isArray(data)
    ? data
        .filter((item: ItemStats) => item.game === dropdownHeaderStore.game)
        .filter((item: ItemStats) =>
          item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a: ItemStats, b: ItemStats) => b.totalQuantity - a.totalQuantity)
    : [];

  // Функция экспорта в CSV
  const exportToCSV = () => {
    if (!filteredData || filteredData.length === 0) return;

    const headers = [
      "ID",
      "Наименование товара",
      "Игра",
      "Количество",
      "Прибыль",
    ];
    const rows = filteredData.map((item: ItemStats) => [
      item.itemId,
      item.itemName,
      item.game,
      item.totalQuantity,
      item.totalEarning,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((row) => row.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `stats_${period}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

        {/* Поиск по названию */}
        <div className={styles.utilsButtons}>
          <input
            type="text"
            placeholder="Поиск по названию..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.search}
          />

          {/* Кнопка экспорта */}
          <button
            onClick={exportToCSV}
            className={styles.exportButton}
            disabled={!filteredData || filteredData.length === 0}
          >
            Экспорт в CSV
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
                {filteredData?.map((item: ItemStats) => (
                  <tr key={item.itemId} className={styles.tableRow}>
                    <td className={styles.tableCell}>{item.itemId}</td>
                    <td className={styles.tableCell}>{item.itemName}</td>
                    <td className={styles.tableCell}>{item.game}</td>
                    <td className={styles.tableCell}>
                      <span className={styles.quantity}>
                        {item.totalQuantity} шт.
                      </span>
                      <span className={styles.quantity}>
                        {item.totalEarning}₽
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredData && filteredData.length === 0 && (
            <div className={styles.emptyState}>Нет данных для отображения</div>
          )}
        </>
      )}
    </div>
  );
});
