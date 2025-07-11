import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useProfile } from "src/hooks/useProfile";
import { toast } from "react-toastify";
import { fetchPurchasedItems } from "src/api/fetchPurchasedItems";
import { withDrawAllItemsAPI } from "src/api/withDrawAllItemsAPI";
import { sendMsgTelegram } from "src/api/sendMsgTelegram";
import { getRecentWithdrawnItemsAPI } from "src/api/getRecentWithdrawnItemsAPI";
import UserItem from "@interfaces/UserItem.interface";

export const useInventoryItems = () => {
  const { user } = useProfile();
  const queryClient = useQueryClient();

  // Получение купленных предметов
  const { data: items = [], isLoading } = useQuery<UserItem[]>({
    queryKey: ["purchasedItems", user?.id],
    queryFn: () => {
      if (!user?.id) throw new Error("User ID is missing");
      return fetchPurchasedItems(user?.id);
    },
    enabled: !!user?.id,
  });

  const { mutateAsync: withDrawAllItems, isPending } = useMutation({
    mutationFn: async (params: {
      mediaContact: string;
      contact: string;
      robloxUsername: string;
    }) => {
      if (!user?.id) throw new Error("User ID is missing");

      await withDrawAllItemsAPI(user?.id);
      toast.success("Все предметы успешно выведены!");

      const recentWithdrawnItems = await getRecentWithdrawnItemsAPI(user?.id);

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
        `<b>🆔 ID:</b> ${user?.id}\n` +
        `<b>📱 Тип связи:</b> ${params.mediaContact}\n` +
        `<b>📨 Контакт:</b> ${params.contact}\n\n` +
        `<b>🌕 Никнейм:</b> <code>${params.robloxUsername}</code>\n\n` +
        itemList;

      sendMsgTelegram(text, true, user?.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["purchasedItems", user?.id] });
    },
    onError: () => {
      toast.error("Ошибка при выводе предметов.");
    },
  });

  const isDisabled =
    items.filter((item) => item.status === "PURCHASED").length === 0;

  return {
    items,
    isDisabled,
    withDrawAllItems,
    isLoading,
    isPending, // статус выполнения мутации
  };
};
