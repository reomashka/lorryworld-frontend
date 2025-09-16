import { Link } from "react-router-dom";

import styles from "./HelpModule.module.scss";

import vk from "@assets/svg/vk.svg";
import tg from "@assets/svg/tg.svg";
import { helpItems } from "./constants/helpItems";
import { HelpCard } from "./components/HelpCard";

export const HelpModule = () => {
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
                <HelpCard
                  number={item.number}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                />
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
