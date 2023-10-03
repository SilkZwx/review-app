import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  iconUrl: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName: {
      reducer: (state, action) => {
        state.name = action.payload;
      },
    },
    removeName: (state) => {
      state.name = null;
    },
    setIconUrl: {
      reducer: (state, action) => {
        state.iconUrl = action.payload;
      },
    },
    removeIconUrl: (state) => {
      state.iconUrl = null;
    },
  },
});

export const { setName, removeName, setIconUrl, removeIconUrl } =
  userSlice.actions;
export const userReducer = userSlice.reducer;
