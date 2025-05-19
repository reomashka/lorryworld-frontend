import { Header } from "@components/Header";
import { Home } from "@modules/Home";
import { BottomNavbar } from "@components/BottomNavbar";

export const HomePage = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <Home />
      </main>
      <BottomNavbar />
    </div>
  );
};
