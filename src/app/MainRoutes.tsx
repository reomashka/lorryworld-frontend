import { Routes, Route, useLocation } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { ProfilePage } from "../pages/ProfilePage";
import { HelpPage } from "../pages/HelpPage";
import { InventoryPage } from "../pages/InventoryPage";
import { AdminPanelPage } from "../pages/AdminPanelPage";
import { PrivateRoute } from "./PrivateRoute";

export const MainRoutes = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <Routes
      location={state?.backgroundLocation || location}
      key={state?.backgroundLocation ? "main-routes-with-bg" : "main-routes"}
    >
      <Route path="/" element={<HomePage />} />
      <Route path="/help" element={<HelpPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/inventory" element={<InventoryPage />} />

      <Route element={<PrivateRoute />}>
        <Route path="/admin" element={<AdminPanelPage />} />
      </Route>
    </Routes>
  );
};
