import { useState } from "react";
import { Link } from "react-router-dom";

import cart from "@assets/svg/cart.svg";
import inventory from "@assets/svg/inventory.svg";
import info from "@assets/svg/info.svg";
import avatar from "@assets/avatar.png";
import { PopupProfile } from "src/UI/PopupProfile";

import styles from "./BottomNavbar.module.scss";

export const BottomNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    console.log("Выход");
    togglePopup();
  };

  const links = [
    { to: "/", icon: cart, label: "Магазин", className: styles.navItem_shop },
    {
      to: "/inventory",
      icon: inventory,
      label: "Инвентарь",
      className: styles.navItem_inventory,
    },
    {
      to: "/help",
      icon: info,
      label: "Помощь",
      className: styles.navItem_help,
    },
  ];

  return (
    <nav className={styles.bottomNavbar}>
      {links.map(({ to, icon, label, className }) => (
        <Link to={to} className={styles.navItem} key={to}>
          <div className={className}>
            <img src={icon} alt={label} />
          </div>
          <span>{label}</span>
        </Link>
      ))}

      <button className={styles.navItem} type="button" onClick={togglePopup}>
        <div className={styles.navItem_avatar}>
          <img src={avatar} alt="Профиль" />
        </div>
        <span>Профиль</span>
      </button>

      {isOpen && <PopupProfile onClose={togglePopup} onLogout={handleLogout} />}
    </nav>
  );
};
