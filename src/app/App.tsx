import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MainRoutes } from "./MainRoutes";
import { ModalRoutes } from "./ModalRoutes";
import { useEffect } from "react";
import { userStore } from "@stores/userStore";

export const App = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  useEffect(() => {
    userStore.fetchProfile();
  }, []);

  return (
    <>
      <ToastContainer />
      <MainRoutes />
      {state?.backgroundLocation && <ModalRoutes />}
    </>
  );
};
