import { Routes, Route, useLocation } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { ProfilePage } from "../pages/ProfilePage";
import { LegalPage } from "../pages/LegalPage";
import { HelpPage } from "../pages/HelpPage";
import { InventoryPage } from "../pages/InventoryPage";
import { AdminPanelPage } from "../pages/AdminPanelPage";
import { PrivateRoute } from "./PrivateRoute";
// import { PrivacyPage } from "@pages/PrivacyPage";
// import { AgreementPage } from "@pages/AgreementPage";
// import { PurchaseTermsPage } from "@pages/PurchaseTermsPage";
// import { ContactsPage } from "@pages/ContactsPage";

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

      {/* legal */}
      <Route path="/legal/:page" element={<LegalPage />} />

      {/* <Route path="/legal/agreement" element={<AgreementPage />} />
      <Route path="/legal/privacy" element={<PrivacyPage />} />
      <Route path="/legal/contacts" element={<ContactsPage />} />
      <Route path="/legal/purchase-terms" element={<PurchaseTermsPage />} /> */}

      <Route element={<PrivateRoute />}>
        <Route path="/admin" element={<AdminPanelPage />} />
      </Route>
    </Routes>
  );
};
