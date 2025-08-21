import styles from "./HelpModule.module.scss";
import auth from "@assets/svg/helpPage/auth.svg";
import roblox from "@assets/svg/helpPage/roblox.svg";
import topup from "@assets/svg/helpPage/topup.svg";
import talk from "@assets/svg/helpPage/talk.svg";
import deposit from "@assets/svg/helpPage/deposit.svg";
import buy from "@assets/svg/helpPage/buy.svg";
import vk from "@assets/svg/vk.svg";
import tg from "@assets/svg/tg.svg";
import { Link } from "react-router-dom";

export const HelpModule = () => {
  const helpItems = [
    {
      number: "01",
      icon: <img src={auth} alt="" />,
      title: "Авторизация",
      description:
        "Зарегистрировать  аккаунт на сайте или войти в существующий",
    },
    {
      number: "02",
      icon: <img src={topup} alt="" />,
      title: "Пополнение",
      description: "Пополнить и дождаться появления средств на балансе",
    },
    {
      number: "03",
      icon: <img src={buy} alt="" />,
      title: "Покупка",
      description:
        'Выбрать и купить предметы, они отобразятся в разделе Инвентарь"',
    },
    {
      number: "04",
      icon: <img src={deposit} alt="" />,
      title: "Вывод",
      description:
        "Зайти в раздел Инвентарь, нажать кнопку Вывести все предметы, следовать предложенным действиям",
    },
    {
      number: "05",
      icon: <img src={talk} alt="" />,
      title: "Связь с админом",
      description:
        "Написать админу в  Telegram, сообщить ему номер вашего заказа и дождаться его ответа",
    },
    {
      number: "06",
      icon: <img src={roblox} alt="" />,
      title: "Получение",
      description:
        "Админ скинет вам ссылку на вип сервер, вам нужно будет на него зайти и дождаться трейда от админа в игре",
    },
  ];

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <section className={styles.helpSection}>
          <h1 className={styles.title}>ПОМОЩЬ</h1>
          <p className={styles.subtitle}>
            Самые представленные пошаговые схемы покупки на нашем сайте
          </p>

          <div className={styles.helpGrid}>
            {helpItems.map((item) => (
              <div key={item.number}>
                <div className={styles.helpCard}>
                  <div className={styles.cardNumber}>{item.number}</div>
                  <div className={styles.cardIcon}>{item.icon}</div>
                </div>
                <div className={styles.cardDescription}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.contactSection}>
          <h2 className={styles.contactTitle}>По любым вопросам</h2>
          <div className={styles.contactButtons}>
            <a
              className={styles.contactButton}
              href="https://t.me/gingermoor"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.contactIcon}>
                <img src={tg} alt="tg" />
              </span>
              @gingermoor
            </a>
            <a
              className={styles.contactButton}
              href="https://vk.com/im?entrypoint=community_page&media=&sel=-209699308"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={styles.contactIcon}>
                <img src={vk} alt="vk" />
              </span>
              lorryworldgg
            </a>
          </div>
        </section>

        <section className={styles.socialSection}>
          <h2 className={styles.socialTitle}>Наши соцсети</h2>
          <div className={styles.socialButtons}>
            <a
              className={styles.socialButton}
              href="https://t.me/lorryworldmm2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={tg} alt="tg" />
            </a>
            <a
              className={styles.socialButton}
              href="https://vk.com/lorryworldgg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={vk} alt="vk" />
            </a>
          </div>
        </section>
        <footer className={styles.footer}>
          <div className={styles.footerLinks}>
            <Link to="/legal/agreement">Пользовательское соглашение</Link>
            <Link to="/legal/privacy">Политика конфиденциальности</Link>
            <Link to="/legal/purchase-terms">Условия покупок</Link>
          </div>
        </footer>
      </main>
    </div>
  );
};
