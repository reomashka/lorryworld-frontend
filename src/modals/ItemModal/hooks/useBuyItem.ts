import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Item } from "@types/item.interface";
import { useNavigate } from "react-router";

interface BuyItemPayload {
  item: Item;
  quantity: number;
  user: { id: string; displayName: string; balance: number };
}

export const useBuyItem = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async ({ item, quantity, user }: BuyItemPayload) => {
      const sale = Number(item.sale);
      const price = Number(item.price);

      const priceToUse = sale > 0 ? sale : price || 0;
      const totalPrice = priceToUse * quantity;

      console.log("Balance:", user.balance, "Total price:", totalPrice);

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

      navigate("/");
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
