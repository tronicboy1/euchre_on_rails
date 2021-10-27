import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  authErrors: null,
  csrfToken: null,
  userId: null,
  roomId: null,
  username: null,
  playerNames: [],
  users: [],
  gameUpdates: []
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
      //remove user from list to avoid selection of self in create room
      state.users = action.payload.filter(user => user[1] !== state.userId);
    },
    setAuthErrors(state, action) {
      state.authErrors = action.payload;
    },
    setGameUpdates(state, action) {
      state.gameUpdates = action.payload;
    },
    leaveRoom(state) {
      state.roomId = null;
      state.playerNames = [];
    },
    logout(state) {
      state = initialState;
    }
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
