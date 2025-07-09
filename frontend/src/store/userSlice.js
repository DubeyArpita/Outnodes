import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null, // name, email, etc.
  role: null, // 'explorer', 'business', 'admin'
  token: null, // for future JWT auth
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.token = action.payload.token;
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.role = null;
      state.token = null;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
