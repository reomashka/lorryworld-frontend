import { Header } from "@components/Header";
import { Home } from "@modules/Home";

export const HomePage = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <Home />
      </main>
    </div>
  );
};
