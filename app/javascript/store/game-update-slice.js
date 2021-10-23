import { createSlice } from "@reduxjs/toolkit";

const gameUpdateSlice = createSlice({
  name: "gameUpdate",
  initialState: {
    gameTelop: "",
    dealer: "",
    trump: "",
    orderedPlayer: "",
    team1Score: 0,
    team2Score: 0,
    team1Tricks: "",
    team2Tricks: "",
  },
  reducers: {
      gameTelop(state, action) {
          state.gameTelop = action.payload;
      },
      dealer(state, action) {
          state.dealer = action.payload;
      },
      orderTrump(state, action) {
          state.trump = action.payload.trump;
          state.orderedPlayer = action.payload.player;
      },
      tricks(state, action) {
          state.team1Tricks = action.payload.team1Tricks;
          state.team2Tricks = action.payload.team2Tricks;
      },
      score(state, action) {
          state.team1Score = action.payload.team1Score;
          state.team2Score = action.payload.team2Score;
      },
      clearHand(state) {
          state.trump = "";
          state.team1Tricks = 0;
          state.team2Tricks = 0;
          state.orderedPlayer = "";
      }
  }
});

export default gameUpdateSlice;
