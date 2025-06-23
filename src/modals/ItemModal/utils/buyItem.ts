import { toast } from "react-toastify";
import { sendMsgTelegram } from "src/api/sendMsgTelegram";
import { Item } from "@interfaces/Item.interface";

export const buyItem = async (
  item: Item,
  quantity: number,
  user: { id: string; displayName: string; balance: number }
): Promise<boolean> => {
  const totalPrice = item.price * quantity;

  if (user.balance < totalPrice) {
    toast.error("Недостаточно средств. Пополните баланс.");
    return false;
  }

  try {
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
      toast.error(data.message || "Ошибка при покупке.");
      return false;
    }

    toast.success("Покупка успешно совершена");
    sendMsgTelegram(
      `<b>Покупка</b> ${item.name} на ${item.price} рублей.
        Имя аккаунта: <i>${user.displayName}</i>
        ID Аккаунта: <i>${user.id}</i>`,
      false
    );
    return true;
  } catch (err) {
    toast.error("Ошибка при отправке запроса." + err);
    return false;
  }
};
