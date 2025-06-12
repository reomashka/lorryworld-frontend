import avatar from "@assets/svg/avatar.svg";
import styles from "./Profile.module.scss";
import { Mail, User, CreditCard } from "lucide-react";
import cover from "@assets/coversHome/legendary.png";

export const Profile = () => {
  return (
    <div className={styles.profilePage}>
      <main className={styles.main}>
        <div className={styles.sidebar}>
          <div className={styles.sidebarTabs}>
            <button
              className={`${styles.sidebarTab} ${styles.sidebarTabActive}`}
            >
              <User />
              Профиль
            </button>
            <button className={styles.sidebarTab}>
              <CreditCard />
              Пополнения
            </button>
          </div>

          <div className={styles.profileInfo}>
            <h2>Личная Информация</h2>
            <div className={styles.profileUser}>
              <div className={styles.profileAvatar}>
                <img src={avatar} alt="User avatar" />
              </div>
              <div className={styles.profileName}>Тимур Кабанов</div>
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
        </div>

        <div className={styles.content}>
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
        </div>
      </main>
    </div>
  );
};
