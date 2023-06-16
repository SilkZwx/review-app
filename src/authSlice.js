import { createSlice} from "@reduxjs/toolkit";

const initialState = {
  isSignIn: null
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.isSignIn = action.payload;
    },
    signOut: (state) => {
      state.isSignIn = null;
    },
  }
});

export const { signIn, signOut } = authSlice.actions;
export const authReducer = authSlice.reducer;
