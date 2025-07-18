import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import cart from "@assets/svg/cart.svg";
import inventory from "@assets/svg/inventory.svg";
import info from "@assets/svg/info.svg";
import avatar from "@assets/avatar.png";
import person from "@assets/svg/person.svg";
import { PopupProfile } from "src/UI/PopupProfile";

import styles from "./BottomNavbar.module.scss";
import { useProfile } from "src/hooks/useProfile";

import { useInventoryItems } from "src/hooks/useInventoryItems";
import { observer } from "mobx-react-lite";

export const BottomNavbar = observer(() => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useProfile();
  const { purchasedItems } = useInventoryItems();

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    console.log("Выход");
    togglePopup();
  };

  return (
    <nav className={styles.bottomNavbar}>
      <Link to="/" className={styles.navItem}>
        <div className={styles.navItem_shop}>
          <img src={cart} alt="Магазин" />
        </div>
        <span>Магазин</span>
      </Link>

      {isAuthenticated ? (
        <Link to="/inventory" className={styles.navItem}>
          <div
            className={styles.navItem_inventory}
            data-count={
              purchasedItems.length > 0 ? purchasedItems.length : undefined
            }
          >
            <img src={inventory} alt="Инвентарь" />
          </div>
          <span>Инвентарь</span>
        </Link>
      ) : (
        <Link
          to="/login"
          state={{ backgroundLocation: location }}
          className={styles.navItem}
        >
          <div className={styles.navItem_inventory}>
            <img src={inventory} alt="Инвентарь" />
          </div>
          <span>Инвентарь</span>
        </Link>
      )}

      <Link to="/help" className={styles.navItem}>
        <div className={styles.navItem_help}>
          <img src={info} alt="Помощь" />
        </div>
        <span>Помощь</span>
      </Link>

      {isAuthenticated ? (
        <button className={styles.navItem} type="button" onClick={togglePopup}>
          <div className={styles.navItem_avatar}>
            <img src={avatar} alt="Профиль" />
          </div>
          <span>Профиль</span>
        </button>
      ) : (
        <Link
          to="/login"
          state={{ backgroundLocation: location }}
          className={styles.navItem}
        >
          <div className={styles.navItem_login}>
            <img src={person} alt="Профиль" />
          </div>
          <span>Войти</span>
        </Link>
      )}

      {isOpen && <PopupProfile onClose={togglePopup} onLogout={handleLogout} />}
    </nav>
  );
});
