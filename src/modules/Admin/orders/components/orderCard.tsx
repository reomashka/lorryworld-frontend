import { Order } from "../types/order.interface";
import styles from "./orderCard.module.scss";

type Props = {
  order: Order;
  isIssued: boolean;
  onToggle: () => void;
};

export const OrderCard = ({ order, isIssued, onToggle }: Props) => {
  return (
    <div
      key={order.id}
      className={`${styles.card} ${isIssued ? styles.cardIssued : ""}`}
    >
      <div className={styles.cardHeader}>
        <div className={styles.orderInfo}>
          <div className={styles.orderId}>
            <span className={styles.label}>Order ID:</span>
            <span className={styles.value}>{order.id}</span>
          </div>
          <div className={styles.showId}>
            <span className={styles.label}>Show ID:</span>
            <span className={styles.badge}>
              #{String(order.orderNumber).padStart(3, "0")}
            </span>
          </div>
        </div>
        <div className={styles.statusIndicator}>
          <div
            className={`${styles.statusDot} ${
              isIssued ? styles.issued : styles.pending
            }`}
          ></div>
        </div>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.userInfo}>
          <div className={styles.userDetail}>
            <span className={styles.label}>Имя:</span>
            <span className={styles.userName}>{order.user.displayName}</span>
          </div>
          <div className={styles.userDetail}>
            <span className={styles.label}>User ID:</span>
            <span className={styles.userId}>{order.user.id}</span>
          </div>
        </div>

        <div className={styles.itemsSection}>
          <h4 className={styles.sectionTitle}>Товары</h4>
          <ul className={styles.itemsList}>
            {order.items.map((item) => (
              <li key={item.id} className={styles.item}>
                <span className={styles.itemName}>
                  {`${item.item.name} x${item.quantity}`}
                </span>
                <span className={styles.itemGame}>({item.item.game})</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.cardFooter}>
        <div className={styles.toggleWrapper}>
          <input
            type="checkbox"
            checked={isIssued}
            onChange={onToggle}
            id={`toggle-${order.id}`}
            className={styles.checkbox}
          />
          <label
            htmlFor={`toggle-${order.id}`}
            className={styles.checkboxLabel}
          >
            <span className={styles.checkboxCustom}></span>
            <span className={styles.checkboxText}>Выдано</span>
          </label>
        </div>
      </div>
    </div>
  );
};
