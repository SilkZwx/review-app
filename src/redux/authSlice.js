import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const token = Cookies.get("token");

const initialState = {
  // クッキーから取得した認証情報を格納する
  sessionToken: token ? token : null,
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
