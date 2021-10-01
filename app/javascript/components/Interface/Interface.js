import React, { useContext } from "react";
import ActionCableContext from "../Helpers/ActionCableContext";
import GameTelop from "../Status/GameTelop/GameTelop";
import Card from "../UI/Card";
import ButtonInterface from "./ButtonInterface/ButtonInterface";
import PlayerHand from "./CardInterface/PlayerHand";
import Kitty from "./Kitty/Kitty";
import Button from "../UI/Button";

const Interface = () => {
  const context = useContext(ActionCableContext);
  const status = context.gameState.status;

  console.log(context.gameState);

  const startGame = () => {
    context.roomChannel.send({ type: "gamecontrol", command: "start-game" });
  };

  return (
    <>
      {context.gameState.playerCards.length >= 5 && <GameTelop />}
      {status === "pickup_or_pass" ? <Kitty /> : status === "throw_away_card" ? <Kitty /> : <></> }
      {status !== "" && <PlayerHand />}
      <Card>
        <ButtonInterface />
      </Card>
      <Button onClick={startGame}>Start Game</Button>
    </>
  );
};

export default Interface;
