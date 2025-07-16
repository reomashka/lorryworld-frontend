/**
 * Главный компонент модуля Help.
 * Импорт через `@/modules/Help`.
 */

import { Link } from "react-router";
import styles from "./HelpPage.module.scss";

export const HelpModule = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Помощь</h1>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.pin}>📌</span>
            <h2 className={styles.cardTitle}>Важные заметки</h2>
          </div>

          <div className={styles.cardContent}>
            <p className={styles.cardText}>
              А пока вы можете ознакомиться с инструкцией в нашем{" "}
              <a
                href="https://t.me/lorryworldmm2/9"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                телеграм канале
              </a>
              .
            </p>

            <div className={styles.contacts}>
              <h3 className={styles.contactsTitle}>СВЯЗЬ С АДМИНОМ</h3>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Телеграм</span>
                <a
                  href="https://t.me/gingermoor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                >
                  @gingermoor
                </a>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Почта</span>
                <a
                  href="mailto:lorryworldspace@gmail.com"
                  className={styles.contactLink}
                >
                  lorryworldspace@gmail.com
                </a>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Вконтакте</span>
                <a
                  href="https://vk.com/lorryworldgg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                >
                  lorryworldgg
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footerButtons}>
          <Link className={styles.footerButton} to="/legal/agreement">
            Пользовательское соглашение
          </Link>
          <Link className={styles.footerButton} to="/legal/privacy">
            Политика конфиденциальности
          </Link>
          <Link className={styles.footerButton} to="/legal/purchase-terms">
            Условия покупок
          </Link>
          <Link className={styles.footerButton} to="/legal/contacts">
            Контакты
          </Link>
        </div>
      </main>
    </div>
  );
};
