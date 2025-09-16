import { Header } from "@components/Header";
import { BottomNavbar } from "@components/BottomNavbar";
import { HelpPageMetadata } from "./HelpPage.metadata";
import { HelpModule } from "@modules/Help";

export const HelpPage = () => {
  return (
    <div className="app">
      <HelpPageMetadata />
      <Header />
      <main>
        <HelpModule />
      </main>
      <BottomNavbar />
    </div>
  );
};
