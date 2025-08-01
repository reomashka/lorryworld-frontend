"use client";

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
  const { user, isAdmin } = useProfile();
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
          {isAdmin && (
            <>
              <p>Ваши заказы</p>
              <div className={styles.ordersContainer}>
                {orders?.map((order: Order) => (
                  <div className={styles.orderCard} key={order.id}>
                    <div className={styles.orderNumber}>
                      {String(order.orderNumber).padStart(3, "0")}
                    </div>
                    <div className={styles.orderStatus}>
                      {order.isIssued ? "Выдан" : "Ожидает"}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <a
            href="https://t.me/gingermoor"
            className={`${styles.socialButton} ${styles["socialButton--tg"]}`}
          >
            <img src={tg || "/placeholder.svg"} alt="Telegram" />
            НАПИСАТЬ В TELEGRAM
          </a>
          <a href="https://vk.com/lorryworldgg" className={styles.socialButton}>
            <img src={vk || "/placeholder.svg"} alt="VK" />
            НАПИСАТЬ В VK
          </a>
          <a
            href="mailto:lorryworldspace@gmail.com"
            className={styles.socialButton}
          >
            <img src={mail || "/placeholder.svg"} alt="Email" />
            НАПИСАТЬ НА EMAIL
          </a>
        </div>
      </div>
    </div>
  );
};
