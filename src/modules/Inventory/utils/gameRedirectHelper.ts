import { fetchActiveOrders } from "src/api/fetchActiveOrdersOfUser";
import { dropdownHeaderStore } from "@store/dropdownHeaderStore";
import { NavigateFunction, Location } from "react-router-dom";

const store = dropdownHeaderStore;

export async function checkAndRedirectToGame(
  userId: string,
  navigate: NavigateFunction,
  location: Location
) {
  const orders = await fetchActiveOrders(userId);

  const games = Array.from(new Set(orders.map((o) => o.game)));

  if (games.length === 1) {
    const game = games[0] as "MM" | "GAG";
    store.select(game);

    // редирект нужен только если мы НЕ на /inventory
    if (location.pathname !== "/inventory") {
      navigate("/inventory");
    }
  } else if (games.length > 1) {
    navigate("/game-selection", {
      state: {
        backgroundLocation: location,
      },
    });
  } else {
    console.warn("Нет предметов для этого пользователя");
    if (location.pathname !== "/empty") {
      navigate("/empty");
    }
  }
}
