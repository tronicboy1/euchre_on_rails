import React, { useEffect, useState } from "react";

import CallSuit from "./CallSuit";
import LonerYesNo from "./LonerYesNo";
import PickupPass from "./PickupPass";
import Card from "../../../../../components/UI/Card";
import { useSelector } from "react-redux";

const ButtonInterface = () => {
  const status = useSelector((state) => state.gameState.status);
  const gameState = useSelector((state) => state.gameState);
  const [highlightButtons, setHighlightButtons] = useState(false);

  useEffect(() => {
    if (gameState.currentPlayer === gameState.playerNo) {
      setHighlightButtons(true);
    } else {
      setHighlightButtons(false);
    }
  }, [gameState.currentPlayer]);

  return (
    <Card className="buttons" className2={highlightButtons && "highlight"}>
      {status === "pickup_or_pass" && <PickupPass />}
      {status === "call_trump" && <CallSuit />}
      {status === "loner_check" && <LonerYesNo />}
    </Card>
  );
};

export default ButtonInterface;
