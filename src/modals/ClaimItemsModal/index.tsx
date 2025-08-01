import { useRef } from "react";
import styles from "./ClaimItemsModal.module.scss";
import { useNavigate } from "react-router-dom";

import { useModalClose } from "src/hooks/useModalClose";

import mail from "@assets/svg/mail.svg";
import vk from "@assets/svg/vk.svg";
import tg from "@assets/svg/tg.svg";
import { useQuery } from "@tanstack/react-query";
import { fetchActiveOrders } from "src/api/fetchActiveOrdersOfUser";
import { useProfile } from "src/hooks/useProfile";

interface Order {
  id: number;
  userId: string;
  orderNumber: number;
  isIssued: boolean;
  createdAt: string;
}

export const ClaimItemsModal = () => {
  const { handleOverlayClick } = useModalClose();
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { user } = useProfile();
  const userId = user?.id;

  const { data: orders } = useQuery({
    queryKey: ["orders", userId],
    queryFn: () => fetchActiveOrders(userId!),
    enabled: !!userId,
  });

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modal} ref={modalRef}>
        <button
          className={styles.closeButton}
          onClick={() => navigate("/")}
          aria-label="Close modal"
        >
          ×
        </button>

        <div className={styles.modalContent}>
          <h1>ПОЛУЧЕНИЕ ТОВАРА</h1>
          <p>Пожалуйста, свяжитесь с админом, чтобы получить предметы</p>
          <p>Ваши заказы</p>

          {orders?.map((order: Order) => (
            <div key={order.id}>
              <p className={styles.orderNumber}>
                #{String(order.orderNumber).padStart(3, "0")}
              </p>
            </div>
          ))}

          <a
            href="https://t.me/gingermoor?text=Здравствуйте! Номер моего заказа №12"
            className={`${styles.socialButton} ${styles["socialButton--tg"]}`}
          >
            <img src={tg} alt="Telegram" />
            НАПИСАТЬ В TELEGRAM
          </a>

          <a href="https://vk.com/lorryworldgg" className={styles.socialButton}>
            <img src={vk} alt="VK" />
            НАПИСАТЬ В VK
          </a>

          <a
            href="mailto:lorryworldspace@gmail.com"
            className={styles.socialButton}
          >
            <img src={mail} alt="Email" />
            НАПИСАТЬ НА EMAIL
          </a>
        </div>
      </div>
    </div>
  );
};
