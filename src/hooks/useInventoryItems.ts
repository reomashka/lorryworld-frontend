import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useProfile } from "src/hooks/useProfile";
import { toast } from "react-toastify";
import { fetchPurchasedItems } from "src/api/fetchPurchasedItems";
import { withDrawAllItems as withDrawAllItemsAPI } from "src/api/withDrawAllItems";
import UserItem from "@sharedTypes/userItem.interface";

export const useInventoryItems = () => {
  const { user } = useProfile();
  const queryClient = useQueryClient();
  const userId = user?.id;

  const { data: items = [], isLoading } = useQuery<UserItem[]>({
    queryKey: ["purchasedItems", userId],
    queryFn: () => {
      if (!userId) throw new Error("User ID is missing");
      return fetchPurchasedItems(userId);
    },
    enabled: !!userId,
  });

  const { mutateAsync: withDrawAllItems, isPending } = useMutation({
    mutationFn: async (params: {
      mediaContact: string;
      contact: string;
      robloxUsername: string;
      game: "MM" | "GAG";
    }) => {
      if (!userId) throw new Error("User ID is missing");

      const res = await withDrawAllItemsAPI(userId, params.game);
      toast.success("Все предметы успешно выведены!");
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["purchasedItems", userId] });
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
