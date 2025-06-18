import { Mail, User, CreditCard } from "lucide-react";
import cover from "@assets/coversItem/ancients.png";
import avatar from "@assets/svg/avatar.svg";
import styles from "./templates.module.scss";
import { Dispatch, SetStateAction } from "react";
import { useProfile } from "src/hooks/useProfile";

type Props = {
  activeTab: "profile" | "payments";
  setActiveTab: Dispatch<SetStateAction<"profile" | "payments">>;
};

export const ProfileTemplate = ({ activeTab, setActiveTab }: Props) => {
  const { user } = useProfile();

  return (
    <>
      <div className={styles.sidebar}>
        <div className={styles.sidebarTabs}>
          <button
            className={`${styles.sidebarTab} ${
              activeTab === "profile" ? styles.sidebarTabActive : ""
            }`}
            onClick={() => setActiveTab("profile")}
          >
            <User />
            Профиль
          </button>
          <button
            className={`${styles.sidebarTab} ${
              activeTab === "payments" ? styles.sidebarTabActive : ""
            }`}
            onClick={() => setActiveTab("payments")}
          >
            <CreditCard />
            Пополнения
          </button>
        </div>

        <>
          <div className={styles.profileInfo}>
            <h2>Личная Информация</h2>
            <div className={styles.profileUser}>
              <div className={styles.profileAvatar}>
                <img src={avatar} alt="User avatar" />
              </div>
              <div className={styles.profileName}>
                {user?.displayName} {user?.role === "ADMIN" && "[ADMIN]"}
              </div>
            </div>
            <div className={styles.profileStats}>
              <div>
                <span className={styles.profileStatLabel}>
                  Купленных предметов:
                </span>
                <span className={styles.profileStatValue}>23</span>
              </div>
            </div>
          </div>

          <div className={styles.emailSection}>
            <h2>E-Mail:</h2>
            <button className={styles.emailLinkButton}>
              <Mail />
              Привяжите ваш email
            </button>
            <p className={styles.emailNote}>
              Если вы забудете пароль от аккаунта, то сможете восстановить его с
              помощью email
            </p>
          </div>
        </>
      </div>

      <div className={styles.content}>
        <>
          <h2 className={styles.contentTitle}>История покупок</h2>
          <div className={styles.purchaseGrid}>
            {Array(12)
              .fill(0)
              .map((_, index) => (
                <div className={styles.purchaseItem} key={index}>
                  <img src={cover} alt="" />
                  <div className={styles.purchaseItemInfo}>
                    <div className={styles.purchaseItemName}>
                      Chroma Lightbringer
                    </div>
                    <div className={styles.purchaseItemPrice}>160 ₽</div>
                  </div>
                </div>
              ))}
          </div>
        </>

        <>
          <h2 className={styles.contentTitle}>История пополнений</h2>
          <div className={styles.purchaseGrid}>
            <div className={styles.purchaseItem}>
              <img src={cover} alt="" />
              <div className={styles.purchaseItemInfo}>
                <div className={styles.purchaseItemName}>Пополнение</div>
                <div className={styles.purchaseItemPrice}>500 ₽</div>
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
};
