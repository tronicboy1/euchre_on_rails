import React from "react";

import styles from "./GameUpdates.module.css";

import Card from "../../components/UI/Card";
import Tile from "../../components/UI/Tile";

const GameUpdates = (props) => {
  return (
    <Card className="form">
      <Card className="form-inner">
        <h3>Game Updates</h3>
        <ul className={styles.updates}>
          {props.gameUpdates ? (
            props.gameUpdates.map((update, i) => (
              <Tile
                key={update.id}
                text={update.text}
                created_at={update.created_at}
                index={i}
                first={i === 0}
                last={i === props.gameUpdates.length - 1}
              />
            ))
          ) : (
            <li>No Game Updates Available.</li>
          )}
        </ul>
      </Card>
    </Card>
  );
};

export default GameUpdates;
