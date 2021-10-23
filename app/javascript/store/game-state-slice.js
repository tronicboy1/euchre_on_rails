import { createSlice } from "@reduxjs/toolkit";
import initialGameState from "./initial-game-state";

const gameStateSlice = createSlice({
    name: 'gameState',
    initialState: initialGameState,
    reducers: {
        statusChange(state, action) {},
        currentPlayer(state, action) {},
        receivePlayerCard(state, action) {},
        receiveKitty(state, action) {},
        playedCard(state, action) {},
        hideCard(state, action) {},
        gameUpdate(state, action) {},
        dealer(state, action) {},
        clearBoard(state, action) {},
        clearHand(state, action) {},
        newHand(state, action) {},
    }
});

export default gameStateSlice;