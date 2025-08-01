import { Header } from "@components/Header";
import { AdminModule } from "@modules/Admin/components/AdminModule";
import { BottomNavbar } from "@components/BottomNavbar";

const AdminPanelPage = () => {
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

export default AdminPanelPage;
