import { userStore } from "@stores/userStore";

export const useProfile = () => {
  const { user, status, error } = userStore;

  const isAuthenticated = user !== null;
  const isAdmin = user?.role === "ADMIN";
  const isLoading = status === "loading";
  const isFailed = status === "failed";
  const isUnauthorized = isFailed && error === "Unauthorized";

  return {
    user,
    status,
    error,
    isAuthenticated,
    isLoading,
    isFailed,
    isUnauthorized,
    isAdmin,
  };
};
