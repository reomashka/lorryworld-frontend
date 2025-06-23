export const fetchProfile = async () => {
  const res = await fetch("/api/users/profile", {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Not authenticated");
  }

  return res.json();
};
