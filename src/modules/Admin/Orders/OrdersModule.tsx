import { useState } from "react";
import styles from "./OrdersModule.module.scss";
import { toast } from "react-toastify";
import { Order } from "./types/order.interface";
import { OrderCard } from "./components/OrderCard";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchNotIssuedOrders, updateIssuedOrders } from "./api/orders";

export const OrdersModule = () => {
  const [modifiedOrders, setModifiedOrders] = useState<Record<string, boolean>>(
    {}
  );
  const [searchValue, setSearchValue] = useState("");

  const {
    data: orders,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["not-issued-orders"],
    queryFn: fetchNotIssuedOrders,
    refetchInterval: 60_000,
  });

  const mutation = useMutation({
    mutationFn: updateIssuedOrders,
    onSuccess: async () => {
      toast.success("Данные сохранены");
      setModifiedOrders({});
      await refetch();
    },
    onError: () => {
      toast.error("Ошибка при сохранении");
    },
  });

  const filteredOrders = orders?.filter((order: Order) => {
    const value = searchValue.trim().toLowerCase();
    if (!value) return true;

    const fields = [
      order.orderNumber.toString(),
      order.user.robloxUsername,
      order.user.displayName,
      order.user.contact,
    ];

    // orderNumber важнее остальных
    if (fields[0]?.toLowerCase().includes(value)) return true;

    return fields
      .slice(1)
      .some((field) => field?.toLowerCase().includes(value));
  });

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

    mutation.mutate(updates);
  }

  const isSaveDisabled = Object.keys(modifiedOrders).length === 0;

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <>
      <div className={styles.pageWrapper}>
        <div className={styles.search}>
          <input
            type="text"
            placeholder="Поиск"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <div className={styles.container}>
          {orders.length === 0 && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>✓</div>
              <h2>Все заказы выданы</h2>
              <p>На данный момент нет заказов, ожидающих выдачи</p>
            </div>
          )}

          {filteredOrders.map((order: Order) => {
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
              СОХРАНИТЬ
            </button>
          </div>
        )}
      </div>
    </>
  );
};
