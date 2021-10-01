import React, { useContext } from "react";
import ActionCableContext from "../../Helpers/ActionCableContext";

import CallSuit from "./CallSuit";
import LonerYesNo from "./LonerYesNo";
import PickupPass from "./PickupPass";

const ButtonInterface = () => {
  const context = useContext(ActionCableContext);

  console.log("context status: ", context.gameState.status);

  if (context.gameState.status === "pickup_or_pass") {
    return <PickupPass />;
  }
  if (context.gameState.status === "call_trump") {
    return <CallSuit />;
  }
  if (context.gameState.status === "loner_check") {
    return <LonerYesNo />;
  }
  return null;
};

export default ButtonInterface;
