import React, { useContext } from "react";
import ActionCableContext from "../Helpers/ActionCableContext";
import GameTelop from "../Status/GameTelop/GameTelop";
import Card from "../UI/Card";
import ButtonInterface from "./ButtonInterface/ButtonInterface";
import PlayerHand from "./CardInterface/PlayerHand";
import Button from "../UI/Button";
import Board from "../Board/Board";

import styles from "./Interface.module.css";

const Interface = () => {
  const context = useContext(ActionCableContext);
  console.log(context);

  const startGame = () => {
    context.roomChannel.send({ type: "gamecontrol", command: "start-game" });
  };

  return (
    <div className={styles.interface}>
      {context.gameState.showTelop && <GameTelop />}
      {context.gameState.showBoard && <Board />}
      {context.gameState.showHand && <PlayerHand />}

      <ButtonInterface />

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
