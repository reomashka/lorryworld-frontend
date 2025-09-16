import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MainRoutes } from "./MainRoutes";
import { ModalRoutes } from "./ModalRoutes";
import { useEffect, useRef } from "react";
import { userStore } from "@/store/userStore";

const ScrollHandler = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };
  const scrollPosition = useRef<number>(0);

  useEffect(() => {
    if (state?.backgroundLocation) {
      scrollPosition.current = window.scrollY;
    } else {
      window.scrollTo(0, scrollPosition.current || 0);
      scrollPosition.current = 0;
    }
  }, [location.pathname, state?.backgroundLocation]);

  return null;
};

export const App = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  useEffect(() => {
    userStore.fetchProfile();
  }, []);

  return (
    <>
      <ToastContainer />
      <ScrollHandler />
      <MainRoutes />
      {state?.backgroundLocation && <ModalRoutes />}
    </>
  );
};
