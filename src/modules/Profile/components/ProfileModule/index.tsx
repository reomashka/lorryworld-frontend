/**
 * Главный компонент модуля Profile.
 * Импорт через `@/modules/Profile`.
 */

import { useState } from "react";

import styles from "./Profile.module.scss";

import { useProfile } from "src/hooks/useProfile";
import { ProfileTemplate } from "./templates/Profile";
import { PaymentTemplate } from "./templates/Payment";

export const Profile = () => {
  const { status, error } = useProfile();
  const [activeTab, setActiveTab] = useState<"profile" | "payments">("profile");

  if (status === "loading") return <p>Loading profile...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className={styles.profilePage}>
      <main className={styles.main}>
        {activeTab === "profile" && (
          <ProfileTemplate activeTab={activeTab} setActiveTab={setActiveTab} />
        )}
        {activeTab === "payments" && (
          <PaymentTemplate activeTab={activeTab} setActiveTab={setActiveTab} />
        )}
      </main>
    </div>
  );
};
