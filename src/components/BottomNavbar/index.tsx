import { Link, useLocation } from "react-router-dom";
import cart from "@assets/svg/cart.svg";
import inventory from "@assets/svg/inventory.svg";
import info from "@assets/svg/info.svg";
import avatar from "@assets/avatar.png";

import styles from "./BottomNavbar.module.scss";
import { PopupProfile } from "@components/PopupProfile";
import { useState } from "react";

export const BottomNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    console.log("Выход");
    togglePopup();
  };

  return (
    <nav className={styles.bottomNavbar}>
      <Link to="/" className={styles}>
        <div className={styles.navItem_shop}>
          <img src={cart} alt="Магазин" />
        </div>
        <span>Магазин</span>
      </Link>
      <Link
        to="/inventory"
        className={isActive("/help") ? "navItem active" : "navItem"}
      >
        <div className={styles.navItem_inventory}>
          <img src={inventory} alt="Помощь" />
        </div>
        <span>Инвентарь</span>
      </Link>

      <Link
        to="/help"
        className={isActive("/help") ? "navItem active" : "navItem"}
      >
        <div className="navItem_info">
          <img src={info} alt="Помощь" />
        </div>
        <span>Помощь</span>
      </Link>

      <button className="navItem" onClick={togglePopup}>
        <div className="navItem_avatar">
          <img src={avatar} alt="Профиль" />
        </div>
        <span>Профиль</span>
      </button>
      {isOpen && <PopupProfile onClose={togglePopup} onLogout={handleLogout} />}
    </nav>
  );
};
