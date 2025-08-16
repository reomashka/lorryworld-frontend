import { Header } from "@components/Header";
import { OrdersModule } from "@modules/Admin";
import { BottomNavbar } from "@components/BottomNavbar";

const OrdersPage = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <OrdersModule />
      </main>
      <BottomNavbar />
    </div>
  );
};

export default OrdersPage;
