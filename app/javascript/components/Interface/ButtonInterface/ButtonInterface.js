import React, { useContext } from "react";
import ActionCableContext from "../../Helpers/ActionCableContext";

import styles from "./ButtonInterface.module.css";
import CallSuit from "./CallSuit";
import LonerYesNo from "./LonerYesNo";
import PickupPass from "./PickupPass";

const ButtonInterface = () => {
    const context = useContext(ActionCableContext);

    if (context.gameState.showButtons === "PICKUP_PASS") {
        return (
            <PickupPass />
        );
    }
    if (context.gameState.showButtons === "CALL_SUIT") {
        return (
            <CallSuit />
        );
    }
    if (context.gameState.showButtons === "LONER_YESNO") {
        return (
            <LonerYesNo />
        );
    }
};

export default ButtonInterface;