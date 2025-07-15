import { Outlet } from "react-router-dom";
import { useProfile } from "../hooks/useProfile";

export const PrivateRoute = () => {
  const { isAdmin } = useProfile();
  return isAdmin ? <Outlet /> : "Доступ запрещен";
};
