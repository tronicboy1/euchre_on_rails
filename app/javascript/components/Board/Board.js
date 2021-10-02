import React, { useContext } from "react";
import ActionCableContext from "../Helpers/ActionCableContext";
import Player1Board from "./Player1Board";
import Player2Board from "./Player2Board";
import Player3Board from "./Player3Board";
import Player4Board from "./Player4Board";

const Board = () => {
  const context = useContext(ActionCableContext);
  const p1Card = context.gameState.playedCards.p1;
  const p2Card = context.gameState.playedCards.p2;
  const p3Card = context.gameState.playedCards.p3;
  const p4Card = context.gameState.playedCards.p4;

  if (context.playerNo === "p1") {
    return (
      <Player1Board
        showKitty={context.gameState.showKitty}
        p1Card={p1Card}
        p2Card={p2Card}
        p3Card={p3Card}
        p4Card={p4Card}
      />
    );
  }
  if (context.playerNo === "p2") {
    return (
      <Player2Board
        showKitty={context.gameState.showKitty}
        p1Card={p1Card}
        p2Card={p2Card}
        p3Card={p3Card}
        p4Card={p4Card}
      />
    );
  }
  if (context.playerNo === "p3") {
    return (
      <Player3Board
        showKitty={context.gameState.showKitty}
        p1Card={p1Card}
        p2Card={p2Card}
        p3Card={p3Card}
        p4Card={p4Card}
      />
    );
  }
  if (context.playerNo === "p4") {
    return (
      <Player4Board
        showKitty={context.gameState.showKitty}
        p1Card={p1Card}
        p2Card={p2Card}
        p3Card={p3Card}
        p4Card={p4Card}
      />
    );
  }
};

export default Board;
