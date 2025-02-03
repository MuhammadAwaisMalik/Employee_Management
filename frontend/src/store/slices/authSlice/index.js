import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authData: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { token, authData } = action.payload;

      state.authData = authData;
      state.token = token;

      localStorage.setItem("token", token);
    },
    logout: (state) => {
      state.authData = null;
      state.token = null;

      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
