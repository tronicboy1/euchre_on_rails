import React, { useContext } from "react";
import ActionCableContext from "../Helpers/ActionCableContext";
import GameTelop from "../Status/GameTelop/GameTelop";
import Card from "../UI/Card";
import ButtonInterface from "./ButtonInterface/ButtonInterface";
import PlayerHand from "./CardInterface/PlayerHand";
import Button from "../UI/Button";
import Board from "../Board/Board";

import styles from "./Interface.module.css";
import { useSelector } from "react-redux";

const Interface = () => {
  const context = useContext(ActionCableContext);
  const gameStatus = useSelector(state => state.gameState);

  console.log(gameStatus);

  const startGame = () => {
    context.roomChannel.send({ type: "gamecontrol", command: "start-game", playerNo: context.playerNo, userId: context.userId });
  };

  return (
    <div className={styles.interface}>
      {context.gameState.showTelop && <GameTelop />}
      {context.gameState.showBoard && <Board />}
      {context.gameState.showHand && <PlayerHand />}

      {["pickup_or_pass", "call_trump", "loner_check"].includes(
        context.gameState.status
      ) && <ButtonInterface />}

      {context.gameState.showStartButton && (
        <Card className="gamestart">
          <Button className="gamestart" onClick={startGame}>
            Start Game
          </Button>
        </Card>
      )}
    </div>
  );
};

export default Interface;
