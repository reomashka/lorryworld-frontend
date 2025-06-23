import { useState } from "react";

export const useQuantity = (initial = 1) => {
  const [quantity, setQuantity] = useState(initial);
  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => setQuantity((q) => Math.max(1, q - 1));
  return { quantity, increase, decrease };
};
