import { X } from "lucide-react";
import styles from "./TopupModal.module.scss";
import { useNavigate } from "react-router-dom";
import { useModalClose } from "src/hooks/useModalClose";
export const TopupModal = () => {
  const navigate = useNavigate();
  const { handleOverlayClick } = useModalClose();

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={() => navigate(-1)}>
          <X size={24} />
        </button>

        <h2 className={styles.modalTitle}>ПОПОЛНЕНИЕ ВРЕМЕННО НЕДОСТУПНО</h2>
      </div>
    </div>
  );
};
