/**
 * Главный компонент модуля Legal.
 * Импорт через `@/modules/Legal`.
 */

// Тексты
import AreementText from "@modules/Legal/texts/AgreementText";
import ContactsText from "@modules/Legal/texts/ContactsText";
import PurchaseTermsText from "@modules/Legal/texts/PurchaseTermsText";
import PrivacyText from "@modules/Legal/texts/PrivacyText";

import styles from "./LegalModule.module.scss";

import { useParams } from "react-router";
import { JSX } from "react";

const pages: Record<string, JSX.Element> = {
  agreement: <AreementText />,
  contacts: <ContactsText />,
  "purchase-terms": <PurchaseTermsText />,
  privacy: <PrivacyText />,
};

export const LegalModule = () => {
  const { page } = useParams();
  const content = pages[page ?? ""];

  return content ? (
    <div className={styles.container}>{content}</div>
  ) : (
    <p>Страница не найдена</p>
  );
};
