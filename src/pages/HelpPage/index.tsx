import { Header } from "@components/Header";
import { HelpModule } from "@modules/Help";
import { BottomNavbar } from "@components/BottomNavbar";

export const HelpPage = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <HelpModule />
      </main>
      <BottomNavbar />
    </div>
  );
};
