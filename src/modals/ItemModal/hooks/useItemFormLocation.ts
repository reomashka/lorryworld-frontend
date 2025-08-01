import { useLocation, useNavigate } from "react-router-dom";
import { Item } from "@types/item.interface";
import { useEffect } from "react";

export const useItemFromLocation = (): Item | null => {
  const location = useLocation();
  const navigate = useNavigate();
  const item: Item = location.state?.item;

  useEffect(() => {
    if (!item) navigate("/", { replace: true }); // или просто null
  }, [item, navigate]);

  return item || null;
};
