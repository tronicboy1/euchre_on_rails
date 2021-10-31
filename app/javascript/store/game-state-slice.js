import { createSlice } from "@reduxjs/toolkit";
import initialGameState from "./initial-game-state";

const hideCard = (card, cardNo, playerNo) => {
  if (card.cardNo === cardNo && card.playerNo === playerNo) {
    card.show = false;
    return card;
  }
  return card;
};

const gameStateSlice = createSlice({
  name: "gameState",
  initialState: initialGameState,
  reducers: {
    statusChange(state, action) {
      //redefine all show status every time in the event of browser refresh
      const status = action.payload.status;
      //do not change state if player cards are not loaded on reconnect
      console.log(state, action.payload);
      if (state.playerCards.length === 0 && action.payload.reconnect) {
        console.log("not reloaded");
        return;
      }
      if (status === "pickup_or_pass") {
        state.showKitty = true;
        state.showTelop = true;
        state.showBoard = true;
        state.showStartButton = false;
        state.showHand = true;
      }
      if (status === "call_trump") {
        state.showKitty = "PLACEHOLDER";
        state.showTelop = true;
        state.showBoard = true;
        state.showStartButton = false;
        state.showHand = true;
      }
      if (status === "throw_away_card") {
        state.showKitty = true;
        state.showTelop = true;
        state.showBoard = true;
        state.showStartButton = false;
        state.showHand = true;
      }
      if (status === "turn") {
        state.showKitty = false;
        state.showTelop = true;
        state.showBoard = true;
        state.showStartButton = false;
        state.showHand = true;
      }
      state.status = status;
    },
    currentPlayer(state, action) {
      state.currentPlayer = action.payload.currentPlayer;
    },
    receivePlayerCard(state, action) {
      if (action.payload.playerNo === state.playerNo) {
        //reset cards array if cards are longer than 6, ie a new hand was dealt
        if (state.playerCards.length < 5) {
          state.playerCards.push({
            b64Img: action.payload.img,
            cardNo: action.payload.cardNo,
            playerNo: action.payload.playerNo,
            show: true,
          });
        } else {
          state.playerCards = [
            {
              b64Img: action.payload.img,
              cardNo: action.payload.cardNo,
              playerNo: action.payload.playerNo,
              show: true,
            },
          ];
        }
      }
    },
    receiveKitty(state, action) {
      state.kitty = { b64Img: action.payload.img, show: true };
      state.showKitty = true;
      state.showTelop = true;
      state.showBoard = true;
      state.showStartButton = false;
      state.showHand = true;
    },
    playedCard(state, action) {
      const played = action.payload.playedCard;
      if (played === "p1") {
        state.playedCards = { ...state.playedCards, p1: action.payload.img };
      }
      if (played === "p2") {
        state.playedCards = { ...state.playedCards, p2: action.payload.img };
      }
      if (played === "p3") {
        state.playedCards = { ...state.playedCards, p3: action.payload.img };
      }
      if (played === "p4") {
        state.playedCards = { ...state.playedCards, p4: action.payload.img };
      }
    },
    hideCard(state, action) {
      state.playerCards = state.playerCards.map((card) =>
        hideCard(card, action.payload.cardNo, action.payload.playerNo)
      );
    },
    clearBoard(state) {
      state.playedCards = {};
      state.currentPlayer = "";
    },
    clearHand(state,action) {
      if (action.payload.playerNo === state.playerNo) {
        state.playerCards = [];
      }
    },
    newHand(state) {
      state.playerCards = [];
      state.kitty = {};
      state.playedCards = {};
    },
    setPlayerNo(state, action) {
      state.playerNo = action.payload;
    },
    resetGameState(state) {
      Object.assign(state, initialGameState);
    },
  },
});

export default gameStateSlice;
