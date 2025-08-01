import { User, CreditCard } from "lucide-react";
import avatar from "@assets/svg/avatar.svg";
import styles from "./templates.module.scss";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useProfile } from "src/hooks/useProfile";

import { toast } from "react-toastify";
import UserItem from "@types/userItem.interface";
import { observer } from "mobx-react-lite";

import rarityItemMap from "src/constants/rarityItemMap";

type Props = {
  activeTab: "profile" | "payments";
  setActiveTab: Dispatch<SetStateAction<"profile" | "payments">>;
};

type RarityKey = keyof typeof rarityItemMap;

export const ProfileTemplate = observer(
  ({ activeTab, setActiveTab }: Props) => {
    const { user } = useProfile();
    const [items, setItems] = useState<UserItem[]>([]);

    const fetchPurchasedItems = async () => {
      try {
        const response = await fetch(
          `/api/item/get-all-purchased/${user?.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();

        if (!response.ok) {
          toast.error(result.message || "Ошибка при получении предметов.");
          return;
        }

        setItems(result);
      } catch (err) {
        console.error(err);
        toast.error("Ошибка при отправке запроса.");
      }
    };

    useEffect(() => {
      if (user?.id) {
        fetchPurchasedItems();
      }
    }, [user?.id]);

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
                  {user?.displayName} {user?.role === "ADMIN" && "[ADMIN]"}{" "}
                  <br /> <br />
                  ID: {user?.id}
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

            {/* <div className={styles.emailSection}>
            <h2>E-Mail:</h2>
            <button className={styles.emailLinkButton}>
              <Mail />
              Привяжите ваш email
            </button>
            <p className={styles.emailNote}>
              Если вы забудете пароль от аккаунта, то сможете восстановить его с
              помощью email
            </p>
          </div> */}
            <div className={styles.emailSection}>
              <h2>Способ связи:</h2>
              <b> Где: </b>
              {user?.mediaContact} <br />
              <b>Контакт:</b> {user?.contact}
            </div>
          </>
        </div>

        <div className={styles.content}>
          <>
            <h2 className={styles.contentTitle}>История покупок</h2>
            <div className={styles.purchaseGrid}>
              {items.map((item, index) => (
                <div className={styles.purchaseItem} key={index}>
                  <div className={styles.itemImage}>
                    <img src={`/uploads/${item.item.icon}.webp`} alt="" />

                    <img
                      src={rarityItemMap[item.item.rarity as RarityKey]}
                      alt={item.item.name}
                    />
                  </div>
                  <div className={styles.purchaseItemInfo}>
                    <div className={styles.purchaseItemName}>
                      {item.item.name}
                    </div>
                    <div className={styles.purchaseItemPrice}>
                      {item.item.price} ₽
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        </div>
      </>
    );
  }
);
