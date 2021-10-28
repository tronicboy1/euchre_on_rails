import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  loggedOut: false,
  authState: 'LOGIN',
  authErrors: null,
  createRoomErrors: null,
  csrfToken: null,
  userId: null,
  roomId: null,
  username: null,
  playerNames: [],
  users: [],
  gameUpdates: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action) {
      state.isAuth = true;
      state.loggedOut = false;
      state.userId = action.payload.userId;
      state.username = action.payload.username;
    },
    setCsrfToken(state, action) {
      state.csrfToken = action.payload;
    },
    setRoom(state, action) {
      state.roomId = action.payload.roomId;
      state.playerNames = action.payload.playerNames;
      state.createRoomErrors = false;
    },
    setUsers(state, action) {
      //remove user from list to avoid selection of self in create room
      state.users = action.payload.filter((user) => user[1] !== state.userId);
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
      state.isAuth = false;
      state.authState = "LOGIN";
      state.authErrors = null;
      state.createRoomErrors = null;
      state.userId = null;
      state.roomId = null;
      state.username = null;
      state.playerNames = [];
      state.users = [];
      state.loggedOut = true;
    },
    setAuthState(state, action) {
      state.authState = action.payload;
      state.authErrors = null;
    },
    setCreateRoomErrors(state, action) {
      state.createRoomErrors = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
