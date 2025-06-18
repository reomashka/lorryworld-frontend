import { Routes, Route, useLocation } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";
import { LoginModal } from "@modals/LoginModal";
import { RegistrationModal } from "@modals/RegistrationModal";
import { ItemModal } from "@modals/ItemModal";
import { TopupModal } from "@modals/TopupModal";
import { InventoryPage } from "@pages/InventoryPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HelpPage } from "@pages/HelpPage";

export default function App() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <>
      <ToastContainer />
      {/* Основной маршрут */}
      <Routes
        location={state?.backgroundLocation || location}
        key="main-routes"
      >
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<HomePage />} />
        <Route path="/help" element={<HelpPage />} />

        {/* Приватные маршруты */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/inventory" element={<InventoryPage />} />
      </Routes>

      {/* Модалка поверх основной страницы */}
      {state?.backgroundLocation && (
        <Routes key="modal-routes">
          <Route path="/login" element={<LoginModal />} />
          <Route path="/register" element={<RegistrationModal />} />
          <Route path="/item" element={<ItemModal />} />
          <Route path="/topup" element={<TopupModal />} />
        </Routes>
      )}
    </>
  );
}
