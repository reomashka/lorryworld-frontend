import { Header } from "@components/Header";
import { AdminModule } from "@modules/Admin";
import { BottomNavbar } from "@components/BottomNavbar";

export const AdminPanelPage = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <AdminModule />
      </main>
      <BottomNavbar />
    </div>
  );
};
