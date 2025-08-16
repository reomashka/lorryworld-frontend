import { Header } from "@components/Header";
import { BottomNavbar } from "@components/BottomNavbar";
import { NavigationGrid } from "@modules/Admin";

const NavigationGridPage = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <NavigationGrid />
      </main>
      <BottomNavbar />
    </div>
  );
};

export default NavigationGridPage;
