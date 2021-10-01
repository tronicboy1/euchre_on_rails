import React, { useContext } from "react";
import ActionCableContext from "../Helpers/ActionCableContext";
import GameTelop from "../Status/GameTelop/GameTelop";
import Card from "../UI/Card";
import ButtonInterface from "./ButtonInterface/ButtonInterface";
import PlayerHand from "./CardInterface/PlayerHand";
import Button from "../UI/Button";
import Board from "../Board/Board";

const Interface = () => {
  const context = useContext(ActionCableContext);

  const startGame = () => {
    context.roomChannel.send({ type: "gamecontrol", command: "start-game" });
  };

  return (
    <>
      {context.gameState.showTelop && <GameTelop />}
      {context.gameState.showBoard && <Board/>}
      {context.gameState.showHand && <PlayerHand />}
      <Card>
        <ButtonInterface />
      </Card>
      <Button onClick={startGame}>Start Game</Button>
    </>
  );
};

export default Interface;
