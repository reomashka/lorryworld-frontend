import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { sendMsgTelegram } from "src/api/sendMsgTelegram";
import { Item } from "@interfaces/Item.interface";

interface BuyItemPayload {
  item: Item;
  quantity: number;
  user: { id: string; displayName: string; balance: number };
}

export const useBuyItem = () => {
  return useMutation({
    mutationFn: async ({ item, quantity, user }: BuyItemPayload) => {
      const totalPrice = item.price * quantity;

      if (user.balance < totalPrice) {
        throw new Error("Недостаточно средств. Пополните баланс.");
      }

      const res = await fetch("/api/item/buy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId: item.id,
          quantity,
          userId: user.id,
          amount: totalPrice,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Ошибка при покупке.");
      }

      // Уведомление в Telegram
      sendMsgTelegram(
        `<b>Покупка</b> ${item.name} на ${item.price} рублей.
Имя аккаунта: <i>${user.displayName}</i>
ID Аккаунта: <i>${user.id}</i>`,
        false
      );

      return true;
    },
    onSuccess: () => {
      toast.success("Покупка успешно совершена");
    },
    onError: (err: Error) => {
      toast.error(err.message || "Ошибка при покупке.");
    },
  });
};
