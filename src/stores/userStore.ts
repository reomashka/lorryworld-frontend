import { makeAutoObservable, runInAction } from "mobx";

export enum UserRole {
  REGULAR = "REGULAR",
  ADMIN = "ADMIN",
}

export enum AuthMethod {
  CREDENTIALS = "CREDENTIALS",
}

export type User = {
  id: string;
  email: string;
  password: string;
  displayName: string;
  mediaContact?: string;
  contact?: string;
  role: UserRole;
  isVerified: boolean;
  method: AuthMethod;
  balance: number;
  createdAt: string;
  updatedAt: string;
};

class UserStore {
  user: User | null = null;
  status: "idle" | "loading" | "succeeded" | "failed" = "idle";
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  fetchProfile() {
    this.status = "loading";
    this.error = null;
    return fetch("/api/users/profile", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        runInAction(() => {
          this.user = data;
          this.status = "succeeded";
        });
      })
      .catch((error) => {
        runInAction(() => {
          this.status = "failed";
          this.error =
            error instanceof Error ? error.message : "Failed to fetch profile";
        });
      });
  }

  async logoutUser() {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Logout failed");
      }

      runInAction(() => {
        this.user = null;
        this.status = "idle";
        this.error = null;
      });
    } catch (error: unknown) {
      runInAction(() => {
        if (error instanceof Error) {
          this.error = error.message;
        } else {
          this.error = "Logout failed";
        }
      });
    }
  }

  logout() {
    this.user = null;
    this.status = "idle";
    this.error = null;
  }
}

export const userStore = new UserStore();
