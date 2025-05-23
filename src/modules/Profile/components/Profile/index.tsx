import avatar from "@assets/svg/avatar.svg";
import "./Profile.scss";
import { Mail, User, CreditCard } from "lucide-react";
import cover from "@assets/coversHome/legendary.png";

export const Profile = () => {
  return (
    <div className="profile-page">
      <main className="main">
        <div className="sidebar">
          <div className="sidebar__tabs">
            <button className="sidebar__tab sidebar__tab--active">
              <User />
              Профиль
            </button>
            <button className="sidebar__tab">
              <CreditCard />
              Пополнения
            </button>
          </div>

          <div className="profile-info">
            <h2>Личная Информация</h2>
            <div className="profile-info__user">
              <div className="profile-info__avatar">
                <img src={avatar} alt="User avatar" />
              </div>
              <div className="profile-info__name">Тимур Кабанов</div>
            </div>
            <div className="profile-info__stats">
              <div className="profile-info__stat">
                <span className="profile-info__stat-label">
                  Купленных предметов:
                </span>
                <span className="profile-info__stat-value">23</span>
              </div>
            </div>
          </div>

          <div className="email-section">
            <h2>E-Mail:</h2>
            <button className="email-section__link-button">
              <Mail />
              Привяжите ваш email
            </button>
            <p className="email-section__note">
              Если вы забудете пароль от аккаунта, то сможете восстановить его с
              помощью email
            </p>
          </div>
        </div>

        <div className="content">
          <h2 className="content__title">История покупок</h2>
          <div className="purchase-grid">
            {Array(12)
              .fill(0)
              .map((_, index) => (
                <div className="purchase-item" key={index}>
                  <img src={cover} alt="" />
                  <div className="purchase-item__info">
                    <div className="purchase-item__name">
                      Chroma Lightbringer
                    </div>
                    <div className="purchase-item__price">160 ₽</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
};
