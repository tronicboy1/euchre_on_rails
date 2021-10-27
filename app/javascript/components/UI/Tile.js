import React from "react";

import styles from "./Tile.module.css";

const Tile = (props) => {
  const time = new Date(props.created_at).toLocaleString();
  return (
    <li className={`${styles.tile} ${props.last ? styles.last : ""}`}>
      <small><strong>{time}</strong></small>
      <br />
      <p>{props.text}</p>
    </li>
  );
};

export default Tile;
