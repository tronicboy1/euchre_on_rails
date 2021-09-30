import React, { useContext } from "react";
import ActionCableContext from "../../Helpers/ActionCableContext";

import styles from "./ButtonInterface.module.css";
import PickupPass from "./PickupPass";

const ButtonInterface = (props) => {
    const context = useContext(ActionCableContext);

    if (context.gameState.showButtons === "PICKUP_PASS") {
        return (
            <PickupPass />
        );
        
    }
};

export default ButtonInterface;