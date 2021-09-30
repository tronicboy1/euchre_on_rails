import React, { useContext } from "react";
import ActionCableContext from "../Helpers/ActionCableContext";
import Player1Board from "./Player1Board";

const Board = () => {
    const context = useContext(ActionCableContext);

    if (context.playerNo === "p1") {
        return (
            <Player1Board />
        );
    }
};

export default Board;