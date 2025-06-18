import { User, CreditCard, Hourglass } from "lucide-react";
import styles from "./templates.module.scss";
import { Dispatch, SetStateAction } from "react";
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

type PaymentStatus = "processing" | "completed" | "cancelled";

type Payment = {
  id: string;
  status: PaymentStatus;
  method: string;
  amount: string;
  date: string;
  time: string;
};

const mockPayments: Payment[] = [
  {
    id: "1",
    status: "processing",
    method: "VISA",
    amount: "975 ₽",
    date: "27.09.2022",
    time: "17:53",
  },
  {
    id: "2",
    status: "completed",
    method: "VISA",
    amount: "145 ₽",
    date: "22.09.2022",
    time: "05:24",
  },
  {
    id: "3",
    status: "cancelled",
    method: "VISA",
    amount: "22 ₽",
    date: "17.09.2022",
    time: "13:54",
  },
  {
    id: "4",
    status: "completed",
    method: "VISA",
    amount: "13 ₽",
    date: "05.08.2022",
    time: "15:02",
  },
  {
    id: "5",
    status: "completed",
    method: "VISA",
    amount: "1764 ₽",
    date: "03.08.2022",
    time: "17:17",
  },
  {
    id: "6",
    status: "completed",
    method: "VISA",
    amount: "255 ₽",
    date: "02.06.2022",
    time: "17:16",
  },
];

const getStatusText = (status: PaymentStatus): string => {
  switch (status) {
    case "processing":
      return "В обработке";
    case "completed":
      return "Переведено";
    case "cancelled":
      return "Отменено";
    default:
      return "";
  }
};

export const PaymentTemplate = ({ activeTab, setActiveTab }: Props) => {
  //   const { user } = useProfile();

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
              {mockPayments.map((payment) => (
                <div key={payment.id} className={styles.tableRow}>
                  <div className={styles.tableCell}>
                    <div className={styles.statusContainer}>
                      <div
                        className={`${styles.statusDot} ${styles[payment.status]}`}
                      ></div>
                      <span className={styles.statusText}>
                        {getStatusText(payment.status)}
                      </span>
                    </div>
                  </div>
                  <div className={styles.tableCell}>{payment.method}</div>
                  <div className={styles.tableCell}>{payment.amount}</div>
                  <div className={styles.tableCell}>{payment.date}</div>
                  <div className={styles.tableCell}>{payment.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
