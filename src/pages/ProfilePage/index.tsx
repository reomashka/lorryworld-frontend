import "./ProfilePage.scss";
import { Header } from "@components/Header";
import avatar from "@assets/svg/avatar.svg";

export const ProfilePage = () => {
  return (
    <div className="profile-page">
      <Header />
      <main className="main">
        <div className="sidebar">
          <div className="sidebar__tabs">
            <button className="sidebar__tab sidebar__tab--active">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Профиль
            </button>
            <button className="sidebar__tab">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 10H21M7 15H8M12 15H13M6 19H18C19.6569 19 21 17.6569 21 16V8C21 6.34315 19.6569 5 18 5H6C4.34315 5 3 6.34315 3 8V16C3 17.6569 4.34315 19 6 19Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Пополнения
            </button>
          </div>

          <div className="profile-info">
            <h2 className="profile-info__title">Личная Информация</h2>
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
            <h2 className="email-section__title">E-Mail:</h2>
            <button className="email-section__link-button">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z"
                  stroke="#E63E2E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
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
                  <div className="purchase-item__image"></div>
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
