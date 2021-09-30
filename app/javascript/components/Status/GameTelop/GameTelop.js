import React, { useContext } from "react";
import ActionCableContext from "../../Helpers/ActionCableContext";
import Card from "../../UI/Card";

import styles from "./GameTelop.module.css";

const GameTelop = () => {
    const context = useContext(ActionCableContext);

    return (
        <Card>
            <div className={styles.gametelop}>
                <h3>{context.gameState.gameUpdate}</h3>
                <div></div>
            </div>
        </Card>
    );
};

export default GameTelop;