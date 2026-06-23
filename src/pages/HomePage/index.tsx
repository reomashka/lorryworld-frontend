import { Header } from "@components/Header";
import { Home } from "@modules/Home";
import { BottomNavbar } from "@components/BottomNavbar";
import { HomePageMetadata } from "./HomePage.metadata";
import { Footer } from "@components/Footer";

export const HomePage = () => {
    return (
        <div className="app">
            <HomePageMetadata />

            <Header />
            <main>
                <Home />
            </main>
            <BottomNavbar />
            <Footer />
        </div>
    );
};
