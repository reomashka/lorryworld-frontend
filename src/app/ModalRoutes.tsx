import { Routes, Route } from "react-router-dom";
import { LoginModal } from "../modals/LoginModal";
import { WithdrawModal } from "../modals/WithdrawModal";
import { ClaimItemsModal } from "../modals/ClaimItemsModal";
import { RegistrationModal } from "../modals/RegistrationModal";
import { ItemModal } from "../modals/ItemModal";
import { TopupModal } from "../modals/TopupModal";

export const ModalRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginModal />} />
    <Route path="/withdraw" element={<WithdrawModal />} />
    <Route path="/claim-items" element={<ClaimItemsModal />} />
    <Route path="/register" element={<RegistrationModal />} />
    <Route path="/item" element={<ItemModal />} />
    <Route path="/topup" element={<TopupModal />} />
  </Routes>
);
