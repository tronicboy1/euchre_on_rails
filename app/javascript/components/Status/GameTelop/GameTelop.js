import React, { useContext } from "react";
import ActionCableContext from "../../Helpers/ActionCableContext";
import Card from "../../UI/Card";
import GameStatus from "./GameStatus";

import styles from "./GameTelop.module.css";

const GameTelop = () => {
  const context = useContext(ActionCableContext);

  return (
    <Card>
      <div className={styles.gametelop}>
        <h3>{context.gameState.gameUpdate.gameTelop}</h3>
        <GameStatus
          dealer={context.gameState.gameUpdate.dealer}
          trump={context.gameState.gameUpdate.trump}
          orderedPlayer={context.gameState.gameUpdate.orderedPlayer}
          team1Tricks={context.gameState.gameUpdate.team1Tricks}
          team2Tricks={context.gameState.gameUpdate.team2Tricks}
          team1Score={context.gameState.gameUpdate.team1Score}
          team2Score={context.gameState.gameUpdate.team2Score}
        />
      </div>
    </Card>
  );
};

export default GameTelop;
