import { CreditCard, DoorClosed, User } from "lucide-react";
import { Link, useLocation } from "react-router";

import styles from "./PopupProfile.module.scss";

type PopupMenuProps = {
  onClose: () => void;
  onLogout: () => void;
};

export const PopupProfile = ({ onClose, onLogout }: PopupMenuProps) => {
  const location = useLocation();
  return (
    <div className={styles.menu}>
      <div className={styles.menuItem} onClick={onClose}>
        <Link
          to="/topup"
          state={{
            backgroundLocation: location.state?.backgroundLocation || location,
          }}
          className={styles.link}
        >
          <CreditCard color="#DF382D" />

          <span>Пополнить</span>
        </Link>
      </div>

      <Link
        to="/profile"
        className={`${styles.menuItem} ${styles.link}`}
        onClick={onClose}
      >
        <User color="#DF382D" />
        <span>Профиль</span>
      </Link>

      <div
        className={styles.menuItem}
        onClick={() => {
          onClose();
          onLogout();
        }}
      >
        <DoorClosed color="#DF382D" />
        <span>Выйти</span>
      </div>
    </div>
  );
};
