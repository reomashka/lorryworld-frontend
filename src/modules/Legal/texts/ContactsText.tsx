import styles from "./Template.module.scss";

const ContactsText = () => {
  return (
    <>
      <h1 className={styles.title}>Контакты</h1>

      <div className={styles.agreementText}>
        <p className={styles.agreementText}>lorryworldspace@gmail.com</p>

        <p className={styles.agreementText}>+79064524342</p>

        <p className={styles.agreementText}>ВКонтакте - lorryworldgg</p>

        <p className={styles.agreementText}>
          GLOGAMING LLC. Reg Number: 36-5040821, 919 North Market st., Suite
          950, Wilmington, DE, 19801
        </p>
      </div>
    </>
  );
};

export default ContactsText;
