import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  authErrors: null,
  csrfToken: null,
  userId: null,
  roomId: null,
  username: null,
  playerNames: [],
  users: []
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action) {
      state.isAuth = true;
      state.userId = action.payload.userId;
      state.username = action.payload.username;
    },
    setCsrfToken(state, action) {
      state.csrfToken = action.payload;
    },
    setRoom(state, action) {
      state.roomId = action.payload.roomId;
      state.playerNames = action.payload.playerNames;
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
    setAuthErrors(state, action) {
      state.authErrors = action.payload;
    }
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
