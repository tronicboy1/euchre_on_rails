import React, { useState, useEffect } from "react";

import styles from "./GameCard.module.css";

const GameCard = (props) => {
  const [cardBlurred, setCardBlurred] = useState(false);
  const cardNo = props.cardNo;

  useEffect(() => {
    const timer = setTimeout(() => {
      setCardBlurred(false);
    }, 1000)
    return () => {
      clearTimeout(timer);
    }
  }, [cardBlurred])

  const onCardClick = () => {
    setCardBlurred(true);
    props.onClick(cardNo);
  };

  const imgData = "data:image/png;base64," + props.b64Img;

  return (
    //<Card className="gamecard">
    <img className={`${styles.gamecard} ${cardBlurred && styles.blurred}`} onClick={onCardClick} src={imgData} />
    //</Card>
  );
};

export default GameCard;
