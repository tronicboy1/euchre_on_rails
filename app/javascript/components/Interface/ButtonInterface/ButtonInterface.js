import React, { useContext, useEffect, useState } from "react";
import ActionCableContext from "../../Helpers/ActionCableContext";

import CallSuit from "./CallSuit";
import LonerYesNo from "./LonerYesNo";
import PickupPass from "./PickupPass";
import Card from "../../UI/Card";

const ButtonInterface = () => {
  const context = useContext(ActionCableContext);
  const [highlightButtons, setHighlightButtons] = useState(false);

  useEffect(() => {
    if (context.gameState.currentPlayer === context.playerNo) {
      setHighlightButtons(true);
    } else {
      setHighlightButtons(false);
    }
  }, [context.gameState.currentPlayer]);

  if (context.gameState.status === "pickup_or_pass") {
    return (
      <Card className={highlightButtons && "highlight"}>
        <PickupPass />
      </Card>
    );
  }
  if (context.gameState.status === "call_trump") {
    return (
      <Card className={highlightButtons && "highlight"}>
        <CallSuit />
      </Card>
    );
  }
  if (context.gameState.status === "loner_check") {
    return (
      <Card className={highlightButtons && "highlight"}>
        <LonerYesNo />
      </Card>
    );
  }
};

export default ButtonInterface;
