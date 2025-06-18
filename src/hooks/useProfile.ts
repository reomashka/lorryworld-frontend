import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { fetchProfile } from "../store/userSlice";

export const useProfile = () => {
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.user.user);
  const status = useSelector((state: RootState) => state.user.status);
  const error = useSelector((state: RootState) => state.user.error);

  const isAuthenticated = user !== null;
  const isLoading = status === "loading";
  const isFailed = status === "failed";
  const isUnauthorized = isFailed && error === "Unauthorized";

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProfile());
    }
  }, [status, dispatch]);

  return {
    user,
    status,
    error,
    isAuthenticated,
    isLoading,
    isFailed,
    isUnauthorized,
  };
};
