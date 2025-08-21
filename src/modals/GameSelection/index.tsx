import { useRef } from "react";
import styles from "./GameSelectionModal.module.scss";
import { useNavigate } from "react-router-dom";
import { useModalClose } from "src/hooks/useModalClose";
import GAG from "@assets/gag.png";
import MM from "@assets/mm.png";
import { useQuery } from "@tanstack/react-query";
import { fetchActiveOrders } from "src/api/fetchActiveOrdersOfUser";
import { useProfile } from "src/hooks/useProfile";
import { dropdownHeaderStore } from "@store/dropdownHeaderStore";

export const GameSelection = () => {
  const { handleOverlayClick } = useModalClose();
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user } = useProfile();
  const userId = user?.id;

  const store = dropdownHeaderStore;

  const { data: orders } = useQuery({
    queryKey: ["orders", userId],
    queryFn: () => fetchActiveOrders(userId!),
    enabled: !!userId,
  });

  async function setGame(game: "MM" | "GAG") {
    store.select(game);
    navigate("/inventory");
  }

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
          <h1>выберите инвентарь игры</h1>
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
