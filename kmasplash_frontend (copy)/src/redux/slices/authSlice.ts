import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SignInResponse, User } from "models/auth.interface";

export interface AuthState {
  isSignedIn: boolean;
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  expiresIn: number | null;
}

const initialState: AuthState = {
  isSignedIn: false,
  user: null,
  token: null,
  refreshToken: null,
  expiresIn: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: () => {
      return initialState;
    },
    /** Set user info and token after signing in successfully */
    signIn: (state, action: PayloadAction<SignInResponse>) => {
      state.isSignedIn = true;
      state.token = `Bearer ${action.payload.accessToken}`;
      state.refreshToken = action.payload.refreshToken;
      state.expiresIn = action.payload.expiresIn;
      state.user = action.payload.user;
    },

    updateProfile: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    /** Explicitly set `isSignedIn` to true */
    setSignedIn: (state) => {
      state.isSignedIn = true;
    },
    /**
     * Save email for reset password process
     * 1. Forgot password
     * 2. Verify code (code will be sent to email). Resend code if needed.
     * 3. Reset password (with email from `resetPasswordEmail` in this global store)
     */
  },
});

export const { signOut, signIn, setSignedIn, updateProfile } =
  authSlice.actions;

export const authReducer = authSlice.reducer;
