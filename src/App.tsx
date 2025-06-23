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
import { WithdrawModal } from "@modals/WithdrawModal";
import { ClaimItemsModal } from "@modals/ClaimItemsModal";

export default function App() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <>
      <ToastContainer />
      {/* Основной маршрут */}
      <Routes
        location={state?.backgroundLocation || location}
        key={state?.backgroundLocation ? "main-routes-with-bg" : "main-routes"}
      >
        <Route path="/" element={<HomePage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/inventory" element={<InventoryPage />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes key="modal-routes">
          <Route path="/login" element={<LoginModal />} />
          <Route path="/withdraw" element={<WithdrawModal />} />
          <Route path="/claim-items" element={<ClaimItemsModal />} />
          <Route path="/register" element={<RegistrationModal />} />
          <Route path="/item" element={<ItemModal />} />
          <Route path="/topup" element={<TopupModal />} />
        </Routes>
      )}
    </>
  );
}
