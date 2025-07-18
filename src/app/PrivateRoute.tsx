import { Outlet } from "react-router-dom";
import { useProfile } from "../hooks/useProfile";
import { observer } from "mobx-react-lite";

export const PrivateRoute = observer(() => {
  const { isAdmin } = useProfile();
  return isAdmin ? <Outlet /> : "Доступ запрещен";
});
