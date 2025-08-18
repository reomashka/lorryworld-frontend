import { Header } from "@components/Header";
import { Profile } from "@modules/Profile";
import { BottomNavbar } from "@components/BottomNavbar";
import { ProfilePageMetadata } from "./ProfilePage.metadata";

export const ProfilePage = () => {
  return (
    <div className="app">
      <ProfilePageMetadata />

      <Header />
      <main>
        <Profile />
      </main>
      <BottomNavbar />
    </div>
  );
};
