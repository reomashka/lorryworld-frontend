import { Routes, Route, useLocation } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { ProfilePage } from "../pages/ProfilePage";
import { LegalPage } from "../pages/LegalPage";
import { HelpPage } from "../pages/HelpPage";
import { InventoryPage } from "../pages/InventoryPage";
import { PrivateRoute } from "./PrivateRoute";
import { lazy, Suspense } from "react";
import StatsItemsPage from "@pages/AdminPages/StatsItemsPage";
import { ScrollToTop } from "@components/ScrollToTop";

const StatsPage = lazy(() => import("../pages/AdminPages/StatsPage"));
const OrdersPage = lazy(() => import("../pages/AdminPages/OrdersPage"));
const NavigationGridPage = lazy(
  () => import("../pages/AdminPages/NavigationGridPage")
);

export const MainRoutes = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ScrollToTop />
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
          <Route path="/admin" element={<NavigationGridPage />} />
          <Route path="/admin/stats" element={<StatsPage />} />
          <Route path="/admin/orders" element={<OrdersPage />} />
          <Route path="/admin/items" element={<StatsItemsPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
