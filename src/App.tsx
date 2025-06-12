import { Routes, Route, useLocation } from "react-router-dom";

import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";
// import { LoginPage } from "./pages/LoginPage";
import { LoginModal } from "@modals/LoginModal";
import { RegistrationModal } from "@modals/RegistrationModal";
import { ItemModal } from "@modals/ItemModal";
import { TopupModal } from "@modals/TopupModal";
import { InventoryPage } from "@pages/InventoryPage";

export default function App() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <>
      {/* Основной маршрут */}
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/login" element={<HomePage />} />
      </Routes>

      {/* Модалка поверх основной страницы */}
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/login" element={<LoginModal />} />
          <Route path="/register" element={<RegistrationModal />} />
          <Route path="/item" element={<ItemModal />} />
          <Route path="/topup" element={<TopupModal />} />
        </Routes>
      )}
    </>
  );
}
