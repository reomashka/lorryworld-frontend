import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerLinks}>
                <Link to="/legal/agreement">Пользовательское соглашение</Link>
                <Link to="/legal/privacy">Политика конфиденциальности</Link>
                <Link to="/legal/purchase-terms">Условия покупок</Link>
            </div>
        </footer>
    );
};
