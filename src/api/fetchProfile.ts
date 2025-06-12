export const fetchProfile = async () => {
  const res = await fetch("http://localhost:3000/users/profile", {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Not authenticated");
  }

  return res.json();
};
