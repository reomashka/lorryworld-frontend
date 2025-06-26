import { User, CreditCard } from "lucide-react";
import styles from "./templates.module.scss";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useProfile } from "src/hooks/useProfile";

import clock from "@assets/svg/clock.svg";
import calendar from "@assets/svg/calendar.svg";
import coins from "@assets/svg/coins_red.svg";
import check from "@assets/svg/check.svg";
import timer from "@assets/svg/timer.svg";

type Props = {
  activeTab: "profile" | "payments";
  setActiveTab: Dispatch<SetStateAction<"profile" | "payments">>;
};

type PaymentStatus = "PENDING" | "SUCCESS" | "cancelled";

type Payment = {
  id: string;
  status: PaymentStatus;
  comment: string;
  amount: string;
  createdAt: string;
};

const getStatusText = (status: PaymentStatus): string => {
  switch (status) {
    case "PENDING":
      return "В обработке";
    case "SUCCESS":
      return "Пополнение";
    case "cancelled":
      return "Отменено";
    default:
      return "";
  }
};

export const PaymentTemplate = ({ activeTab, setActiveTab }: Props) => {
  const { user } = useProfile();
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    const fetchPayments = async () => {
      if (!user?.id) return;

      try {
        const response = await fetch(`/api/payment/get-payments/${user.id}`);
        console.log(user.id);
        if (!response.ok) {
          console.error("Ошибка загрузки платежей:", response.statusText);
          return;
        }
        const data: Payment[] = await response.json();
        console.log(data);
        setPayments(data);
      } catch (err) {
        console.error("Ошибка сети:", err);
      }
    };

    fetchPayments();
  }, [user?.id]);

  return (
    <>
      <div className={styles.sidebarPayment}>
        <div className={styles.sidebarTabs}>
          <button
            className={`${styles.sidebarTab} ${
              activeTab === "profile" ? styles.sidebarTabActive : ""
            }`}
            onClick={() => setActiveTab("profile")}
          >
            <User />
            Профиль
          </button>
          <button
            className={`${styles.sidebarTab} ${
              activeTab === "payments" ? styles.sidebarTabActive : ""
            }`}
            onClick={() => setActiveTab("payments")}
          >
            <CreditCard />
            Пополнения
          </button>
        </div>

        <div className={styles.profileInfo}>
          <div className={styles.paymentsTable}>
            <div className={styles.tableHeader}>
              <div className={styles.headerCell}>
                <img src={timer} alt="" /> СТАТУС
              </div>
              <div className={styles.headerCell}>
                <img src={check} alt="" />
                МЕТОД
              </div>
              <div className={styles.headerCell}>
                <img src={coins} alt="" />
                СУММА
              </div>
              <div className={styles.headerCell}>
                <img src={calendar} alt="" />
                ДАТА
              </div>
              <div className={styles.headerCell}>
                <img src={clock} alt="" />
                ВРЕМЯ
              </div>
            </div>
            <div className={styles.tableBody}>
              {payments
                .slice()
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .map((payment) => (
                  <div key={payment.id} className={styles.tableRow}>
                    <div className={styles.tableCell} data-label="Статус">
                      <div className={styles.statusContainer}>
                        <div
                          className={`${styles.statusDot} ${styles[payment.status]}`}
                        ></div>
                        <span className={styles.statusText}>
                          {getStatusText(payment.status)}
                        </span>
                      </div>
                    </div>

                    <div className={styles.tableCell} data-label="Метод">
                      {payment.comment}
                    </div>
                    <div className={styles.tableCell} data-label="Сумма">
                      {payment.amount}
                    </div>
                    <div className={styles.tableCell} data-label="Дата">
                      {new Date(payment.createdAt).toLocaleDateString("ru-RU")}
                    </div>
                    <div className={styles.tableCell} data-label="Время">
                      {new Date(payment.createdAt).toLocaleTimeString("ru-RU", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                ))}
              <div className={styles.tableBody}>
                {(!payments || payments.length === 0) && (
                  <div className={styles.noData}>
                    Вы еще не пополняли баланс
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
