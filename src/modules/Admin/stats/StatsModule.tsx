/**
 * Главный компонент модуля Admin.
 * Импорт через `@/modules/Admin`.
 */

import styles from "./StatsModule.module.scss";

import { getAdminStats, StatsData } from "src/api/getAdminStats";
import { useQuery } from "@tanstack/react-query";
import { RegistrationChart } from "./components/RegistrationChart";
import { DatePicker } from "./components/DatePicker";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export const StatsModule = () => {
  const [range, setRange] = useState<DateRange | undefined>(undefined);

  const { data, isLoading } = useQuery<StatsData>({
    queryKey: ["admin-stats"],
    queryFn: getAdminStats,
  });

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);

  const formatNumber = (num: number) =>
    new Intl.NumberFormat("ru-RU").format(num);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Статистика продаж</h1>
        <p className={styles.subtitle}>Заработано/продано</p>
      </div>

      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} ${styles.dailyCard}`}>
          <div className={styles.cardIcon}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2V22M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6312 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6312 13.6815 18 14.5717 18 15.5C18 16.4283 17.6312 17.3185 16.9749 17.9749C16.3185 18.6312 15.4283 19 14.5 19H6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>За сегодня</h3>

            <div className={styles.cardValue}>
              {isLoading ? (
                <div className={styles.skeleton}></div>
              ) : (
                <span className={styles.amount}>
                  {formatCurrency(data?.earnings.today ?? 0)}
                </span>
              )}
            </div>
            {/* <div className={styles.cardChange}>
              <span className={styles.positive}>+12.5%</span>
              <span className={styles.changeText}>от вчера</span>
            </div> */}
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.totalCard}`}>
          <div className={styles.cardIcon}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V18C20 18.5304 19.7893 19.0391 19.4142 19.4142C19.0391 19.7893 18.5304 20 18 20H6C5.46957 20 4.96086 19.7893 4.58579 19.4142C4.21071 19.0391 4 18.5304 4 18V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 2H9C8.44772 2 8 2.44772 8 3V5C8 5.55228 8.44772 6 9 6H15C15.5523 6 16 5.55228 16 5V3C16 2.44772 15.5523 2 15 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 11V16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 13H14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>За вчера</h3>
            <div className={styles.cardValue}>
              {isLoading ? (
                <div className={styles.skeleton}></div>
              ) : (
                <span className={styles.amount}>
                  {formatCurrency(data?.earnings.yesterday ?? 0)}
                </span>
              )}
            </div>
            <div className={styles.cardChange}>
              {/* <span className={styles.neutral}>Общая сумма</span> */}
            </div>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.weeklyCard}`}>
          <div className={styles.cardIcon}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 3V21H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 12L12 7L16 11L21 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>За неделю</h3>
            <div className={styles.cardValue}>
              {isLoading ? (
                <div className={styles.skeleton}></div>
              ) : (
                <span className={styles.amount}>
                  {formatCurrency(data?.earnings.week ?? 0)}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.itemsCard}`}>
          <div className={styles.cardIcon}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 6H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>Продано товаров</h3>

            <div className={styles.cardValue}>
              {isLoading ? (
                <div className={styles.skeleton}></div>
              ) : (
                <span className={styles.amount}>
                  {formatNumber(data?.items.today ?? 0)}
                </span>
              )}
            </div>
            <div className={styles.cardChange}>
              {/* <span className={styles.positive}>+8.2%</span> */}
              <span className={styles.changeText}>За сегодня</span>
            </div>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.itemsCard}`}>
          <div className={styles.cardIcon}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 6H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>Продано товаров</h3>
            <div className={styles.cardValue}>
              {isLoading ? (
                <div className={styles.skeleton}></div>
              ) : (
                <span className={styles.amount}>
                  {formatNumber(data?.items.yesterday ?? 0)}
                </span>
              )}
            </div>
            <div className={styles.cardChange}>
              {/* <span className={styles.positive}>+8.2%</span> */}
              <span className={styles.changeText}>За вчера</span>
            </div>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.itemsCard}`}>
          <div className={styles.cardIcon}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 6H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>Продано товаров</h3>
            <div className={styles.cardValue}>
              {isLoading ? (
                <div className={styles.skeleton}></div>
              ) : (
                <span className={styles.amount}>
                  {formatNumber(data?.items.week ?? 0)}
                </span>
              )}
            </div>
            <div className={styles.cardChange}>
              {/* <span className={styles.positive}>+8.2%</span> */}
              <span className={styles.changeText}>За неделю</span>
            </div>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.itemsCard}`}>
          <div className={styles.cardIcon}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 6H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>Пользователи</h3>

            <div className={styles.cardValue}>
              {isLoading ? (
                <div className={styles.skeleton}></div>
              ) : (
                <span className={styles.amount}>
                  {formatNumber(data?.registrations.today ?? 0)}
                </span>
              )}
            </div>
            <div className={styles.cardChange}>
              {/* <span className={styles.positive}>+8.2%</span> */}
              <span className={styles.changeText}>За сегодня</span>
            </div>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.itemsCard}`}>
          <div className={styles.cardIcon}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 6H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>Пользователи</h3>
            <div className={styles.cardValue}>
              {isLoading ? (
                <div className={styles.skeleton}></div>
              ) : (
                <span className={styles.amount}>
                  {formatNumber(data?.registrations.yesterday ?? 0)}
                </span>
              )}
            </div>
            <div className={styles.cardChange}>
              {/* <span className={styles.positive}>+8.2%</span> */}
              <span className={styles.changeText}>За вчера</span>
            </div>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.itemsCard}`}>
          <div className={styles.cardIcon}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 6H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className={styles.cardContent}>
            <h3 className={styles.cardTitle}>Пользователи</h3>
            <div className={styles.cardValue}>
              {isLoading ? (
                <div className={styles.skeleton}></div>
              ) : (
                <span className={styles.amount}>
                  {formatNumber(data?.registrations.week ?? 0)}
                </span>
              )}
            </div>
            <div className={styles.cardChange}>
              {/* <span className={styles.positive}>+8.2%</span> */}
              <span className={styles.changeText}>За неделю</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.header}>
        <h1 className={styles.title}>Количество регистраций</h1>
      </div>
      <div className={styles.datePicker}>
        <DatePicker range={range} onRangeChange={setRange} />
      </div>
      <div className={`${styles.statCard} ${styles.dailyCard}`}>
        {range?.from && range?.to ? (
          <RegistrationChart
            from={range.from.toISOString().split("T")[0]}
            to={range.to.toISOString().split("T")[0]}
          />
        ) : (
          <p>Выберите диапазон дат, чтобы увидеть статистику</p>
        )}
      </div>

      <div className={styles.footer}>
        <p className={styles.footerText}>
          Последнее обновление: {new Date().toLocaleString("ru-RU")}
        </p>
      </div>
    </div>
  );
};
