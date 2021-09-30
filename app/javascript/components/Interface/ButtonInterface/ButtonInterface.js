import React, { useContext } from "react";
import ActionCableContext from "../../Helpers/ActionCableContext";

import styles from "./ButtonInterface.module.css";
import CallSuit from "./CallSuit";
import LonerYesNo from "./LonerYesNo";
import PickupPass from "./PickupPass";
import Button from "../../UI/Button";

const ButtonInterface = () => {
  const context = useContext(ActionCableContext);

  const startGame = () => {
    context.roomChannel.send({ type: "gamecontrol", command: "start-game" });
  };

  console.log("context showbuttons: ", context.gameState.showButtons);

  if (context.gameState.showButtons === "PICKUP_PASS") {
    return <PickupPass />;
  }
  if (context.gameState.showButtons === "CALL_SUIT") {
    return <CallSuit />;
  }
  if (context.gameState.showButtons === "LONER_YESNO") {
    return <LonerYesNo />;
  }
  return <Button onClick={startGame}>Start Game</Button>;
};

export default ButtonInterface;
