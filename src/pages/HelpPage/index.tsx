import { Header } from "@components/Header";
import { HelpModule } from "@modules/Help";
import { BottomNavbar } from "@components/BottomNavbar";
import { HelpPageMetadata } from "./HelpPage.metadata";

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
