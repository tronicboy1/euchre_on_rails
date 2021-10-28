import React from "react";

import styles from "./GameUpdates.module.css";

import Card from "../../components/UI/Card";
import Tile from "../../components/UI/Tile";

const GameUpdates = (props) => {
  return (
    <Card className="form">
      <Card style={{ height: "45vh" }} className="form-inner" className2="flexbox">
        <h3 style={{ marginBottom: "1.5rem" }}>Game Updates</h3>
        {props.gameUpdates && (
          <ul className={styles.updates}>
            {props.gameUpdates.map((update, i) => (
              <Tile
                key={update.id}
                text={update.text}
                created_at={update.created_at}
                index={i}
                first={i === 0}
                last={i === props.gameUpdates.length - 1}
              />
            ))}
          </ul>
        )}
      </Card>
    </Card>
  );
};

export default GameUpdates;
