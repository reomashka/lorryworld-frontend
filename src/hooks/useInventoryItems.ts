import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useProfile } from "src/hooks/useProfile";
import { toast } from "react-toastify";
import { fetchPurchasedItems } from "src/api/fetchPurchasedItems";
import { withDrawAllItems as withDrawAllItemsAPI } from "src/api/withDrawAllItems";
import { sendMsgTelegram } from "src/api/sendMsgTelegram";
import { getRecentWithdrawnItems as getRecentWithdrawnItemsAPI } from "src/api/getRecentWithdrawnItems";
import UserItem from "@sharedTypes/userItem.interface";
import { dropdownHeaderStore } from "@store/dropdownHeaderStore";

export const useInventoryItems = () => {
  const { user } = useProfile();
  const queryClient = useQueryClient();

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
      game: "MM" | "GAG";
    }) => {
      if (!user?.id) throw new Error("User ID is missing");

      await withDrawAllItemsAPI(user?.id, params.game);
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

      const type = dropdownHeaderStore.game;
      sendMsgTelegram(text, true, user?.id, type);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["purchasedItems", user?.id] });
    },
    onError: () => {
      toast.error("Ошибка при выводе предметов.");
    },
  });

  // Фильтрация предметов
  const purchasedItems = items.filter((item) => item.status === "PURCHASED");

  const waitingItems = items.filter(
    (item) => item.status === "WITHDRAWN" && item.isIssued === false
  );

  const hasNotIssued = waitingItems.some((item) => item.isIssued === false);

  const isDisabled = purchasedItems.length === 0;

  return {
    items,
    purchasedItems,
    waitingItems,
    hasNotIssued,
    isDisabled,
    withDrawAllItems,
    isLoading,
    isPending,
  };
};
