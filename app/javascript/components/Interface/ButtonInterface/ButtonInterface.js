import React, { useContext } from "react";
import ActionCableContext from "../../Helpers/ActionCableContext";

import CallSuit from "./CallSuit";
import LonerYesNo from "./LonerYesNo";
import PickupPass from "./PickupPass";
import Card from "../../UI/Card";

const ButtonInterface = () => {
  const context = useContext(ActionCableContext);

  if (context.gameState.status === "pickup_or_pass") {
    return <Card><PickupPass /></Card>;
  }
  if (context.gameState.status === "call_trump") {
    return <Card><CallSuit /></Card>;
  }
  if (context.gameState.status === "loner_check") {
    return <Card><LonerYesNo /></Card>;
  }
  return null;
};

export default ButtonInterface;
