import React, { useContext } from "react";
import ActionCableContext from "../Helpers/ActionCableContext";
import GameTelop from "../Status/GameTelop/GameTelop";
import Card from "../UI/Card";
import ButtonInterface from "./ButtonInterface/ButtonInterface";
import PlayerHand from "./CardInterface/PlayerHand";
import Kitty from "./Kitty/Kitty";

const Interface = () => {
  const context = useContext(ActionCableContext);

  return (
    <>
      {context.gameState.playerCards.length === 5 && <GameTelop />}
      {context.gameState.kitty.show &&
        context.gameState.playerCards.length === 5 && <Kitty />}
      <PlayerHand />
      <Card>
        <ButtonInterface />
      </Card>
    </>
  );
};

export default Interface;
