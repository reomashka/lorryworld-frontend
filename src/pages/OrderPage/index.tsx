import { useEffect, useState } from "react";
import styles from "./OrderPage.module.scss";
import { Header } from "@components/Header";

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
    const updates = Object.entries(modifiedOrders).map(([orderId, issued]) => ({
      orderId,
      issued,
    }));
    if (updates.length === 0) {
      alert("Нет изменений для сохранения");
      return;
    }
    try {
      const res = await fetch("/api/order/update-issued", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        alert("Данные сохранены");
        setModifiedOrders({});
        const fresh = await fetch("/api/order/not-issued");
        const data = await fresh.json();
        setOrders(data);
      } else {
        alert("Ошибка при сохранении");
      }
    } catch {
      alert("Ошибка сети");
    }
  }

  // Кнопка СОХРАНИТЬ дизейблится, если нет изменений
  const isSaveDisabled = Object.keys(modifiedOrders).length === 0;

  return (
    <>
      <Header />
      <div className={styles.container}>
        {orders.map((order: Order) => {
          const isIssued = Object.prototype.hasOwnProperty.call(
            modifiedOrders,
            order.id
          )
            ? modifiedOrders[order.id]
            : order.isIssued;

          return (
            <div key={order.id} className={styles.card}>
              <div className={styles.header}>Order ID: {order.id}</div>
              <div className={styles.subheader}>
                User ID: {order.user.id}
                <br />
                Name: {order.user.displayName}
              </div>
              <div>
                <strong>Товары:</strong>
                <ul className={styles.itemsList}>
                  {order.items.map((item) => (
                    <li key={item.id}>
                      {item.item.name} ({item.item.game})
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.toggleWrapper}>
                <input
                  type="checkbox"
                  checked={isIssued}
                  onChange={() => toggleIssued(order.id)}
                  id={`toggle-${order.id}`}
                />
                <label htmlFor={`toggle-${order.id}`}>Выдано</label>
              </div>
            </div>
          );
        })}
      </div>
      <button
        className={styles.saveButton}
        onClick={saveChanges}
        disabled={isSaveDisabled}
      >
        СОХРАНИТЬ
      </button>
    </>
  );
};
