import { useState } from "react";
import { Link } from "react-router-dom";
import wallet from "@assets/svg/wallet.svg";
import logo from "@assets/svg/logo.svg";
import avatar from "@assets/svg/avatar.svg";
import cart from "@assets/svg/cart.svg";
import info from "@assets/svg/info.svg";
import inventory from "@assets/svg/inventory.svg";

import { PopupProfile } from "src/UI/PopupProfile";

import "./Header.scss";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    console.log("Выход");
    togglePopup();
  };
  return (
    <header className="header">
      <div className="headerContainer">
        <div className="left-block">
          <Link to="/">
            <div className="logo-container">
              <div className="logo">
                <img src={logo} alt="logo" />
              </div>
              <div className="brand-info">
                <h1>Lorry World</h1>
                <p>Магазин Murder Mystery 2</p>
              </div>
            </div>
          </Link>

          <nav className="main-nav">
            <Link className="nav-button shop-button" to="/">
              <img src={cart} alt="" />
              МАГАЗИН
            </Link>
            <Link className="nav-button" to="/">
              <img src={inventory} alt="" />
              ИНВЕНТАРЬ
            </Link>
            <Link className="nav-button" to="/">
              <img src={info} alt="" />
              ПОМОЩЬ
            </Link>
          </nav>
        </div>

        <div className="user-controls">
          <div className="balance">
            <span className="balance-icon">
              <img src={wallet} alt="" width={30} />
            </span>
            <span className="balance-amount">1200 ₽</span>
            <button className="add-funds">+</button>
          </div>

          <div className="user-profile">
            <button className="avatar-button" onClick={togglePopup}>
              <img src={avatar} alt="avatar" />
            </button>

            {isOpen && (
              <PopupProfile onClose={togglePopup} onLogout={handleLogout} />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
