import { Header } from "@components/Header";
import { BottomNavbar } from "@components/BottomNavbar";
import { Inventory } from "@modules/Inventory";
import { InventoryPageMetadata } from "./InventoryPage.metadata";

export const InventoryPage = () => {
  return (
    <div className="app">
      <InventoryPageMetadata />

      <Header />
      <main>
        <Inventory />
      </main>
      <BottomNavbar />
    </div>
  );
};
