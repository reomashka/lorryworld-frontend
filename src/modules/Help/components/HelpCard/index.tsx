import styles from "./HelpCard.module.scss";
import { ReactNode } from "react";

interface Props {
  number: string;
  icon: ReactNode;
  title: string;
  description: string;
}

export const HelpCard = ({ number, icon, title, description }: Props) => {
  return (
    <>
      <div className={styles.helpCard}>
        <div className={styles.cardNumber}>{number}</div>
        <div className={styles.cardIcon}>{icon}</div>
      </div>
      <div className={styles.cardDescription}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </>
  );
};
