import React from "react";
import { useSelector } from "react-redux";

import styles from "./GameUpdates.module.css";

import Card from "../../components/UI/Card";
import Tile from "../../components/UI/Tile";

const GameUpdates = () => {
  const gameUpdates = useSelector((state) => state.auth.gameUpdates);
  return (
    <Card style={{ height: "45vh" }} className="form" className2="flexbox">
        <h3 style={{ marginBottom: "1.5rem", color: "white" }}>Game Updates</h3>
        {gameUpdates && (
          <ul className={styles.updates}>
            {gameUpdates.map((update, i) => (
              <Tile
                key={update.id}
                text={update.text}
                created_at={update.created_at}
                index={i}
                first={i === 0}
                last={i === gameUpdates.length - 1}
              />
            ))}
          </ul>
        )}
    </Card>
  );
};

export default GameUpdates;
