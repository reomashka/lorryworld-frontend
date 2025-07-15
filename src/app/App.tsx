import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MainRoutes } from "./MainRoutes";
import { ModalRoutes } from "./ModalRoutes";

export const App = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <>
      <ToastContainer />
      <MainRoutes />
      {state?.backgroundLocation && <ModalRoutes />}
    </>
  );
};
