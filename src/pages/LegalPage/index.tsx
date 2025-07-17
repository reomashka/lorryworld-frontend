/**
 * Страница включающая в себя юридическую информацию.
 */

import { Header } from "@components/Header";
import { LegalModule } from "@modules/Legal";

export const LegalPage = () => {
  return (
    <>
      <Header />
      <LegalModule />
    </>
  );
};
