import { Header } from "@components/Header";
import { StatsModule } from "@modules/Admin";
import { BottomNavbar } from "@components/BottomNavbar";

const StatsPage = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <StatsModule />
      </main>
      <BottomNavbar />
    </div>
  );
};

export default StatsPage;
