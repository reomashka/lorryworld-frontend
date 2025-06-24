import { CreditCard, DoorClosed, User } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";

import { AppDispatch } from "../../store";
import { logoutUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";

import styles from "./PopupProfile.module.scss";

type PopupMenuProps = {
  onClose: () => void;
  onLogout: () => void;
};

export const PopupProfile = ({ onClose, onLogout }: PopupMenuProps) => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  return (
    <div className={styles.menu}>
      <Link
        to="/profile"
        className={`${styles.menuItem} ${styles.link}`}
        onClick={onClose}
      >
        <User color="#DF382D" />
        <span>Профиль</span>
      </Link>

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

      <div
        className={styles.menuItem}
        onClick={() => {
          onClose();
          onLogout();
        }}
      >
        <DoorClosed color="#DF382D" />
        <span onClick={handleLogout} style={{ cursor: "pointer" }}>
          Выйти
        </span>
      </div>
    </div>
  );
};
