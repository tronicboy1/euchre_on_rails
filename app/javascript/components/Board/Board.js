import React, { useContext } from "react";
import ActionCableContext from "../Helpers/ActionCableContext";
import Player1Board from "./Player1Board";

const Board = () => {
  const context = useContext(ActionCableContext);
  const p1Card = "data:image/png;base64," + context.gameState.playedCards.p1;
  const p2Card = "data:image/png;base64," + context.gameState.playedCards.p2;
  const p3Card = "data:image/png;base64," + context.gameState.playedCards.p3;
  const p4Card = "data:image/png;base64," + context.gameState.playedCards.p4;

  if (context.playerNo === "p1") {
    return (
      <Player1Board
        p1Card={p1Card}
        p2Card={p2Card}
        p3Card={p3Card}
        p4Card={p4Card}
      />
    );
  }
};

export default Board;
