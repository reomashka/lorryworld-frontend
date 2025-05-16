import { useState } from "react";

import "./ProfilePage.scss";
import { Header } from "../../components/Header";

export const ProfilePage = () => {
  const purchaseItems = Array(12).fill({
    name: "Chroma Lightsinger",
    price: "160 ₽",
    image: "/placeholder.svg?height=150&width=150",
  });

  const [activeTab, setActiveTab] = useState("profile");
  return (
    <div className="app">
      <Header />

      <div className="main-content">
        <div className="sidebar">
          <div className="profile-tabs">
            <button
              className={`tab ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              <span className="icon user-icon"></span>
              Профиль
            </button>
            <button
              className={`tab ${activeTab === "topup" ? "active" : ""}`}
              onClick={() => setActiveTab("topup")}
            >
              <span className="icon wallet-icon"></span>
              Пополнения
            </button>
          </div>

          <div className="profile-info">
            <h2>Личная Информация</h2>

            <div className="user-info">
              <div className="avatar-container">
                <div className="avatar-placeholder"></div>
              </div>
              <div className="user-name">Timur</div>
            </div>

            <div className="purchased-items">
              <span>Купленных предметов: 23</span>
            </div>

            <div className="email-section">
              <h2>E-Mail:</h2>

              <div className="email-link">
                <span className="email-icon"></span>
                <span>Привяжите ваш email</span>
              </div>

              <p className="email-note">
                Если вы забудете пароль от аккаунта, то сможете восстановить его
                с помощью email
              </p>
            </div>
          </div>
        </div>

        <div className="content">
          <div className="purchase-history">
            <h2>История покупок</h2>

            <div className="purchase-grid">
              {purchaseItems.map((item, index) => (
                <div className="purchase-item" key={index}>
                  <div className="item-image">
                    <div className="purple-placeholder"></div>
                  </div>
                  <div className="item-info">
                    <div className="item-name">{item.name}</div>
                    <div className="item-price">{item.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bottom-navigation">
        <button
          className={`nav-item ${activeTab === "store" ? "active" : ""}`}
          onClick={() => setActiveTab("store")}
        >
          <span className="icon cart-icon"></span>
          <span className="label">Магазин</span>
        </button>

        <button
          className={`nav-item ${activeTab === "inventory" ? "active" : ""}`}
          onClick={() => setActiveTab("inventory")}
        >
          <span className="icon grid-icon"></span>
          <span className="label">Инвентарь</span>
        </button>

        <button
          className={`nav-item ${activeTab === "help" ? "active" : ""}`}
          onClick={() => setActiveTab("help")}
        >
          <span className="icon help-icon"></span>
          <span className="label">Помощь</span>
        </button>

        <button
          className={`nav-item ${activeTab === "profile" ? "active" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          <span className="icon user-icon"></span>
          <span className="label">Профиль</span>
        </button>
      </div>
    </div>
  );
};
