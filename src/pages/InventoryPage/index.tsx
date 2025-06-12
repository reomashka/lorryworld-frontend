import { Header } from "@components/Header";
import { BottomNavbar } from "@components/BottomNavbar";
import { Inventory } from "@modules/Inventory";

export const InventoryPage = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <Inventory />
      </main>
      <BottomNavbar />
    </div>
  );
};
