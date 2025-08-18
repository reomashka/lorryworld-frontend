import { useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useModalClose = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const background = location.state?.backgroundLocation;

  const closeModal = useCallback(() => {
    if (background) {
      navigate(background, { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, [background, navigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeModal]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return { handleOverlayClick, closeModal };
};
