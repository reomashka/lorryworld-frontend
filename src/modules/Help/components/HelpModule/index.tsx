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
              <a href="#" className={styles.link}>
                телеграм канале
              </a>
              .
            </p>

            <div className={styles.contacts}>
              <h3 className={styles.contactsTitle}>СВЯЗЬ С АДМИНОМ</h3>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Телеграм</span>
                <a href="#" className={styles.contactLink}>
                  @gingermoor
                </a>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Почта</span>
                <a href="#" className={styles.contactLink}>
                  lorryworldspace@gmail.com
                </a>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Вконтакте</span>
                <a href="#" className={styles.contactLink}>
                  lorryworldgg
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footerButtons}>
          <Link className={styles.footerButton} to="/agreement">
            Пользовательское соглашение
          </Link>
          <button className={styles.footerButton}>
            Политика конфиденциальности
          </button>
          <button className={styles.footerButton}>Условия покупок</button>
          <button className={styles.footerButton}>Контакты</button>
        </div>
      </main>
    </div>
  );
};
