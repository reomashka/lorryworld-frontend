import { useEffect, useState } from "react";
import styles from "./OrderPage.module.scss";
import { Header } from "@components/Header";
import { toast } from "react-toastify";

interface Item {
  id: number;
  name: string;
  price: number;
  sale: number | null;
  availability: boolean;
  type: string;
  icon: string;
  description: string | null;
  game: string;
  rarity: string;
}

interface OrderItem {
  id: string;
  userId: string;
  orderId: number;
  itemId: number;
  quantity: number;
  amount: number;
  status: string;
  isIssued: boolean;
  updatedAt: string;
  createdAt: string;
  item: Item;
}

interface User {
  id: string;
  email: string;
  password: string;
  role: string;
  isVerified: boolean;
  method: string;
  createdAt: string;
  updatedAt: string;
  balance: number;
  displayName: string;
  contact: string;
  mediaContact: string;
}

interface Order {
  id: number;
  orderNumber: number;
  userId: string;
  isIssued: boolean;
  createdAt: string;
  user: User;
  items: OrderItem[];
}

export const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [modifiedOrders, setModifiedOrders] = useState<Record<string, boolean>>(
    {}
  );

  useEffect(() => {
    fetch("/api/order/not-issued")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  function toggleIssued(orderId: number) {
    setModifiedOrders((prev) => ({
      ...prev,
      [orderId]:
        !prev[orderId] && prev[orderId] !== false ? true : !prev[orderId],
    }));
  }

  async function saveChanges() {
    const updates = Object.entries(modifiedOrders)
      .filter(([, issued]) => issued)
      .map(([orderId]) => ({ orderId: Number(orderId) }));

    if (updates.length === 0) {
      toast.error("Нет изменений для сохранения");
      return;
    }

    try {
      const res = await fetch("/api/order/update-issued", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (res.ok) {
        toast.success("Данные сохранены");
        setModifiedOrders({});
        const fresh = await fetch("/api/order/not-issued");
        const data = await fresh.json();
        setOrders(data);
      } else {
        toast.error("Ошибка при сохранении");
      }
    } catch {
      toast.error("Ошибка сети");
    }
  }

  const isSaveDisabled = Object.keys(modifiedOrders).length === 0;

  return (
    <>
      <Header />
      <div className={styles.pageWrapper}>
        <div className={styles.container}>
          {orders.length === 0 && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>✓</div>
              <h2>Все заказы выданы</h2>
              <p>На данный момент нет заказов, ожидающих выдачи</p>
            </div>
          )}

          {orders.map((order: Order) => {
            const isIssued = Object.prototype.hasOwnProperty.call(
              modifiedOrders,
              order.id
            )
              ? modifiedOrders[order.id]
              : order.isIssued;

            return (
              <div
                key={order.id}
                className={`${styles.card} ${
                  isIssued ? styles.cardIssued : ""
                }`}
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
                      <span className={styles.userName}>
                        {order.user.displayName}
                      </span>
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
                          <span className={styles.itemGame}>
                            ({item.item.game})
                          </span>
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
                      onChange={() => toggleIssued(order.id)}
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
          })}
        </div>

        {orders.length !== 0 && (
          <div className={styles.actionBar}>
            <button
              className={`${styles.saveButton} ${
                isSaveDisabled ? styles.disabled : ""
              }`}
              onClick={saveChanges}
              disabled={isSaveDisabled}
            >
              <span className={styles.buttonIcon}>💾</span>
              СОХРАНИТЬ
            </button>
          </div>
        )}
      </div>
    </>
  );
};
