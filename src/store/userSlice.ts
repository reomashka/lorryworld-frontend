import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
  role: UserRole;
  isVerified: boolean;
  method: AuthMethod;
  balance: number;
  createdAt: string;
  updatedAt: string;
};

type UserState = {
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: UserState = {
  user: null,
  status: "idle",
  error: null,
};

// Fetch profile
export const fetchProfile = createAsyncThunk<User>(
  "user/fetchProfile",
  async () => {
    const res = await fetch("http://localhost:3000/users/profile", {
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Unauthorized");
    }

    return await res.json();
  }
);

// Logout from server
export const logoutUser = createAsyncThunk<void>(
  "user/logoutUser",
  async () => {
    const res = await fetch("http://localhost:3000/auth/logout", {
      method: "POST", // или GET — смотри, как настроен backend
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Logout failed");
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Вручную можно вызывать, если не используешь logoutUser
    logout(state) {
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch profile";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.status = "idle";
        state.error = null;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
