import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "src/api/fetchProfile";

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    retry: false,
  });
};
