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
      const { token, role, authData } = action.payload;
      console.log(authData, "authData");

      state.authData = authData;
      state.token = token;
      state.role = role;

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
