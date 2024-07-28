import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.userData = action.payload;
      state.isAuth = true;
    },
    logout: (state) => {
      state.userData = null;
      state.isAuth = false;
    },
  },
});
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
