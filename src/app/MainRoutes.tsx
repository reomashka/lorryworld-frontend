import { Routes, Route, useLocation } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { ProfilePage } from "../pages/ProfilePage";
import { LegalPage } from "../pages/LegalPage";
import { HelpPage } from "../pages/HelpPage";
import { InventoryPage } from "../pages/InventoryPage";
import { PrivateRoute } from "./PrivateRoute";
import { lazy, Suspense } from "react";
import { OrderPage } from "@pages/OrderPage";

const AdminPanelPage = lazy(() => import("../pages/AdminPanelPage"));

export const MainRoutes = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes
        location={state?.backgroundLocation || location}
        key={state?.backgroundLocation ? "main-routes-with-bg" : "main-routes"}
      >
        <Route path="/" element={<HomePage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/legal/:page" element={<LegalPage />} />

        <Route element={<PrivateRoute />}>
          <Route path="/admin" element={<AdminPanelPage />} />
          <Route path="/orders" element={<OrderPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
