import React, { useContext } from "react";
import { useSelector } from "react-redux";
import ActionCableContext from "../Helpers/ActionCableContext";
import Player1Board from "./Player1Board";
import Player2Board from "./Player2Board";
import Player3Board from "./Player3Board";
import Player4Board from "./Player4Board";
import Card from "../../../../components/UI/Card";
import cardSuits from "../../../../../assets/images/card_suits.png";

const Board = () => {
  const context = useContext(ActionCableContext);
  const playedCards = useSelector((state) => state.gameState.playedCards);
  const showKitty = useSelector((state) => state.gameState.showKitty);
  const p1Card = playedCards.p1;
  const p2Card = playedCards.p2;
  const p3Card = playedCards.p3;
  const p4Card = playedCards.p4;

  if (context.playerNo === "p1") {
    return (
      <Card className="board">
        <Player1Board
          showKitty={showKitty}
          p1Card={p1Card}
          p2Card={p2Card}
          p3Card={p3Card}
          p4Card={p4Card}
          playerNames={context.playerNames}
          cardSuits={cardSuits}
        />
      </Card>
    );
  }
  if (context.playerNo === "p2") {
    return (
      <Card className="board">
        <Player2Board
          showKitty={showKitty}
          p1Card={p1Card}
          p2Card={p2Card}
          p3Card={p3Card}
          p4Card={p4Card}
          playerNames={context.playerNames}
          cardSuits={cardSuits}
        />
      </Card>
    );
  }
  if (context.playerNo === "p3") {
    return (
      <Card className="board">
        <Player3Board
          showKitty={showKitty}
          p1Card={p1Card}
          p2Card={p2Card}
          p3Card={p3Card}
          p4Card={p4Card}
          playerNames={context.playerNames}
          cardSuits={cardSuits}
        />
      </Card>
    );
  }
  if (context.playerNo === "p4") {
    return (
      <Card className="board">
        <Player4Board
          showKitty={showKitty}
          p1Card={p1Card}
          p2Card={p2Card}
          p3Card={p3Card}
          p4Card={p4Card}
          playerNames={context.playerNames}
          cardSuits={cardSuits}
        />
      </Card>
    );
  }
};

export default Board;
