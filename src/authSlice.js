import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sessionToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: {
      reducer: (state, action) => {
        state.sessionToken = action.payload;
      },
      prepare: (auth) => {
        if (auth) {
          return { payload: auth };
        } else {
          return { payload: null };
        }
      },
    },
    signOut: (state) => {
      state.sessionToken = null;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export const authReducer = authSlice.reducer;
