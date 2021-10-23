import React, { useEffect, useState } from "react";

import CallSuit from "./CallSuit";
import LonerYesNo from "./LonerYesNo";
import PickupPass from "./PickupPass";
import Card from "../../UI/Card";
import { useSelector } from "react-redux";

const ButtonInterface = () => {
  const status = useSelector(state => state.gameState.status);
  const gameState = useSelector(state => state.gameState);
  const [highlightButtons, setHighlightButtons] = useState(false);

  useEffect(() => {
    if (gameState.currentPlayer === gameState.playerNo) {
      setHighlightButtons(true);
    } else {
      setHighlightButtons(false);
    }
  }, [gameState.currentPlayer]);

  if (status === "pickup_or_pass") {
    return (
      <Card className={highlightButtons && "highlight"}>
        <PickupPass />
      </Card>
    );
  }
  if (status === "call_trump") {
    return (
      <Card className={highlightButtons && "highlight"}>
        <CallSuit />
      </Card>
    );
  }
  if (status === "loner_check") {
    return (
      <Card className={highlightButtons && "highlight"}>
        <LonerYesNo />
      </Card>
    );
  }
};

export default ButtonInterface;
