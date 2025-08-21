import { useRef } from "react";
import styles from "./GameSelectionModal.module.scss";
import { useModalClose } from "src/hooks/useModalClose";
import GAG from "@assets/gag.png";
import MM from "@assets/mm.png";
import { dropdownHeaderStore } from "@store/dropdownHeaderStore";

interface GameSelectionProps {
  onSelect: (game: "MM" | "GAG") => void;
  onClose: () => void;
}

export const GameSelection = ({ onSelect, onClose }: GameSelectionProps) => {
  const { handleOverlayClick } = useModalClose();
  const modalRef = useRef<HTMLDivElement>(null);

  function setGame(game: "MM" | "GAG") {
    dropdownHeaderStore.select(game);
    onSelect(game);
    onClose();
  }

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modal} ref={modalRef}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        <div className={styles.modalContent}>
          <h1>Выберите инвентарь игры</h1>
          <div className={styles.images}>
            <button onClick={() => setGame("MM")}>
              <img src={MM} alt="MM" />
              <span>Murder Mystery 2</span>
            </button>

            <button onClick={() => setGame("GAG")}>
              <img src={GAG} alt="GAG" />
              <span>Grow a Garden</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
