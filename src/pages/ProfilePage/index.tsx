import { Header } from "@components/Header";
import { Profile } from "@modules/Profile";
import { BottomNavbar } from "@components/BottomNavbar";

export const ProfilePage = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <Profile />
      </main>
      <BottomNavbar />
    </div>
  );
};
