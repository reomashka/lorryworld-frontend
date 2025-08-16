import { Header } from "@components/Header";
import { StatsItemsModule } from "@modules/Admin";
import { BottomNavbar } from "@components/BottomNavbar";

const StatsItemsPage = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <StatsItemsModule />
      </main>
      <BottomNavbar />
    </div>
  );
};

export default StatsItemsPage;
