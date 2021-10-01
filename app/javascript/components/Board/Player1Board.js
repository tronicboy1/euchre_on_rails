import React from "react";
import Card from "../UI/Card";

import styles from "./Board.module.css";

const Player1Board = (props) => {
  return (
    <Card>
      <div className={styles.board}>
        <div className={styles.upper}>
          <Card className="boardcard">
            <img src={props.p3Card} />
          </Card>
        </div>
        <div className={styles.middle}>
          <Card className="boardcard">
            <img src={props.p2Card} />
          </Card>
          <Card className="boardcard">
            <img src={props.p4Card} />
          </Card>
        </div>
        <div className={styles.lower}></div>
        <Card className="boardcard">
          <img src={props.p1Card} />
        </Card>
      </div>
    </Card>
  );
};

export default Player1Board;
