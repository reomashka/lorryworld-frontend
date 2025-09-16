import { http } from "@/lib/http";
import { User } from "@sharedTypes/user.interface";

export async function fetchProfile() {
  return await http<User>("/api/users/pofile", {
    credentials: "include",
  });
}
