import { CreditCard, DoorClosed, User } from "lucide-react";
import { Link } from "react-router-dom";

import "./PopupProfile.scss";

type PopupMenuProps = {
  onClose: () => void;
  onLogout: () => void;
};

export const PopupProfile = ({ onClose, onLogout }: PopupMenuProps) => {
  return (
    <div className="menu">
      <div className="menuItem" onClick={onClose}>
        <span>
          <CreditCard color="#DF382D" />
        </span>
        <span>Пополнить</span>
      </div>

      <Link to="/profile" className="menuItem" onClick={onClose}>
        <span>
          <User color="#DF382D" />
        </span>
        <span>Профиль</span>
      </Link>

      <div
        className="menuItem"
        onClick={() => {
          onClose();
          onLogout();
        }}
      >
        <span>
          <DoorClosed color="#DF382D" />
        </span>
        <span>Выйти</span>
      </div>
    </div>
  );
};
