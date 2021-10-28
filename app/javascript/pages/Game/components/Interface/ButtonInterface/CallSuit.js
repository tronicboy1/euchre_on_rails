import React, { useContext } from "react";
import ActionCableContext from "../../Helpers/ActionCableContext";
import Button from "../../../../../components/UI/Button";

import styles from "./CallSuit.module.css";

const CallSuit = () => {
    const context = useContext(ActionCableContext);

    const onCallSpades = () => {
        context.roomChannel.send({ type: "gamecontrol", command: 0, id: context.userId });
    };

    const onCallClubs = () => {
        context.roomChannel.send({ type: "gamecontrol", command: 1, id: context.userId });
    };

    const onCallDiamonds = () => {
        context.roomChannel.send({ type: "gamecontrol", command: 2, id: context.userId });
    };

    const onCallHearts = () => {
        context.roomChannel.send({ type: "gamecontrol", command: 3, id: context.userId });
    };

    const onPass = () => {
        context.roomChannel.send({ type: "gamecontrol", command: false, id: context.userId });
    };

    return (
        <div className={styles['button-bar']}>
            <Button className="bar-left" onClick={onCallSpades}>♤</Button>
            <Button className="bar-center" onClick={onCallClubs}>♧</Button>
            <Button className="bar-center" onClick={onCallDiamonds}>♢</Button>
            <Button className="bar-center" onClick={onCallHearts}>♡</Button>
            <Button className="bar-right" onClick={onPass}>Pass</Button>
        </div>
    );
};

export default CallSuit;