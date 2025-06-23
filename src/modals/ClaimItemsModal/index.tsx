import { useRef } from "react";
import styles from "./ClaimItemsModal.module.scss";
import { useNavigate } from "react-router-dom";

import { useModalClose } from "src/hooks/useModalClose";

import mail from "@assets/svg/mail.svg";
import vk from "@assets/svg/vk.svg";
import tg from "@assets/svg/tg.svg";

export const ClaimItemsModal = () => {
  const { handleOverlayClick } = useModalClose();
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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
          <h1>ЗАЙДИТЕ НА СЕРВЕР</h1>
          <p>Пожалуйста, свяжитесь с админом, чтобы получить предметы</p>

          <a
            href="http://t.me/@gingermoor"
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
