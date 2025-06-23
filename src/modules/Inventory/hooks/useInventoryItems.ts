import { useEffect, useState } from "react";
import { useProfile } from "src/hooks/useProfile";
import { toast } from "react-toastify";
import { fetchPurchasedItems } from "src/api/fetchPurchasedItems";
import { withDrawAllItemsAPI } from "src/api/withDrawAllItemsAPI";
import { sendMsgTelegram } from "src/api/sendMsgTelegram";
import UserItem from "@interfaces/UserItem.interface";
import { getRecentWithdrawnItemsAPI } from "src/api/getRecentWithdrawnItemsAPI";

export const useInventoryItems = () => {
  const { user } = useProfile();
  const [items, setItems] = useState<UserItem[]>([]);

  const fetchPurchasedItemsAPI = async () => {
    try {
      if (!user?.id) throw new Error("User ID is missing");

      const result = await fetchPurchasedItems(user.id);
      setItems(result);
    } catch (err) {
      console.error(err);
      toast.error("Ошибка при получении предметов.");
    }
  };

  const withDrawAllItems = async (mediaContact: string, contact: string) => {
    try {
      if (!user?.id) throw new Error("User ID is missing");

      // Вывод всех предметов
      await withDrawAllItemsAPI(user.id);
      toast.success("Все предметы успешно выведены!");

      // Получение только что выведенных предметов
      const recentWithdrawnItems = await getRecentWithdrawnItemsAPI(user.id);

      // Формирование сообщения
      const itemList = recentWithdrawnItems
        .map(
          (item: UserItem) =>
            `🔹 <b>${item.item.name}</b>\n` +
            `💰 Цена: ${item.item.price}₽\n` +
            `🎯 Тип: ${item.item.type}\n` +
            `📦 Количество: ${item.quantity}\n` +
            `🏷️ Редкость: ${item.item.rarity}`
        )
        .join(`\n\n`);

      const text =
        `<b>📤 Вывод предметов</b>\n\n` +
        `<b>👤 Пользователь:</b> ${user.displayName}\n` +
        `<b>🆔 ID:</b> ${user.id}\n` +
        `<b>📱 Тип связи:</b> ${mediaContact}\n` +
        `<b>📨 Контакт:</b> ${contact}\n\n` +
        itemList;

      sendMsgTelegram(text, true, user.id);

      // Обновить список предметов
      await fetchPurchasedItemsAPI();
    } catch (err) {
      console.error(err);
      toast.error("Ошибка при выводе предметов.");
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchPurchasedItemsAPI();
    }
  }, [user?.id]);

  const isDisabled =
    items.filter((item) => item.status === "PURCHASED").length === 0;

  return { items, isDisabled, withDrawAllItems };
};
