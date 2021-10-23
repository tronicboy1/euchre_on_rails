import { configureStore, createSlice } from "@reduxjs/toolkit";
import gameStateSlice from "./game-state-slice";
import { current } from "immer";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [{ id: 0, content: "Welcome to Euchre on Rails!" }],
  },
  reducers: {
    addMessage(state, action) {
      const id = state.messages[0].id + 1;
      const username = action.payload.username;
      const content = action.payload.message;
      state.messages.unshift({ id, username, content });
    },
  },
});

const store = configureStore({
  reducer: {
    gameState: gameStateSlice.reducer,
    chat: chatSlice.reducer,
  },
});

export const gameStateActions = gameStateSlice.actions;
export const chatActions = chatSlice.actions;
export default store;
