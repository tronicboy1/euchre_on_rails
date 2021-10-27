import React from "react";

import styles from "./Card.module.css";

const Card = (props) => {
  return (
    <div
      className={`${styles.card} ${styles[props.className]} ${
        styles[props.className2]
      }`}
      style={props.style}
    >
      {props.children}
    </div>
  );
};

export default Card;
