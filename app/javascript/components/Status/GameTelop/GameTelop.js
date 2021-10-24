import React, { useContext } from "react";
import { useSelector } from "react-redux";
import ActionCableContext from "../../Helpers/ActionCableContext";
import Card from "../../UI/Card";
import GameStatus from "./GameStatus";

import styles from "./GameTelop.module.css";

const GameTelop = () => {
  const context = useContext(ActionCableContext);
  const gameUpdate = useSelector(state => state.gameUpdate);

  let teamNo;

  if (context.playerNo === "p1" || context.playerNo === "p3") {
    teamNo = 1;
  } else {
    teamNo = 2;
  }

  return (
    <Card className="gametelop">
      <div className={styles.gametelop}>
        <Card className="inner">
          <div className={styles.gameupdate}>{gameUpdate.gameTelop}</div>
        </Card>
        <GameStatus
          dealer={gameUpdate.dealer}
          trump={gameUpdate.trump}
          orderedPlayer={gameUpdate.orderedPlayer}
          team1Tricks={gameUpdate.team1Tricks}
          team2Tricks={gameUpdate.team2Tricks}
          team1Score={gameUpdate.team1Score}
          team2Score={gameUpdate.team2Score}
          teamNo={teamNo}
        />
      </div>
    </Card>
  );
};

export default GameTelop;
