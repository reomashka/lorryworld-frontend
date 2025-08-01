import { useEffect, useState } from "react";
import styles from "./OrderPage.module.scss";
import { Header } from "@components/Header";
import { toast } from "react-toastify";
import { Order } from "./types/order.interface";
import { OrderCard } from "./components/orderCard";

export const OrdersModule = () => {
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
              <OrderCard
                key={order.id}
                order={order}
                isIssued={isIssued}
                onToggle={() => toggleIssued(order.id)}
              />
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
