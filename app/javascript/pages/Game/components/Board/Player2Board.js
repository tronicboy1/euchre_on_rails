import React from "react";
import Kitty from "../Interface/Kitty/Kitty";
import Card from "../../../../components/UI/Card";
import Image from "../../../../components/UI/Image";

import styles from "./Board.module.css";

const Player2Board = (props) => {
  if (props.showKitty === "PLACEHOLDER") {
    return (
      <div className={styles.board}>
        <Card className="boardcard">
          <div className={styles.placeholder}>♤♧♢♡</div>
        </Card>
      </div>
    );
  }
  if (props.showKitty) {
    return (
      <div className={`${styles.board} ${styles.kitty}`}>
        <Kitty />
      </div>
    );
  }
  return (
    <div className={styles.board}>
      <div className={styles.upper}>
        <Card className="boardcard">
          <small>{props.playerNames.p4}</small>
          {props.p4Card ? (
            <Image src={props.p4Card} />
          ) : (
            <div className={styles.placeholder} />
          )}
        </Card>
      </div>
      <div className={styles.middle}>
        <Card className="boardcard" className2="left">
          <small>{props.playerNames.p3}</small>
          {props.p3Card ? (
            <Image src={props.p3Card} />
          ) : (
            <div className={styles.placeholder} />
          )}
        </Card>
        <Card className="boardcard" className2="right">
          <small>{props.playerNames.p1}</small>
          {props.p1Card ? (
            <Image src={props.p1Card} />
          ) : (
            <div className={styles.placeholder} />
          )}
        </Card>
      </div>
      <div className={styles.lower}>
        <Card className="boardcard">
          {props.p2Card ? (
            <Image src={props.p2Card} />
          ) : (
            <div className={styles.placeholder} />
          )}
        </Card>
      </div>
    </div>
  );
};

export default Player2Board;
