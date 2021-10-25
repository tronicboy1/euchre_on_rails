import React from "react";

import styles from "./GameCard.module.css";

const GameCard = (props) => {
    const cardNo = props.cardNo;
    const onCardClick = () => {
        props.onClick(cardNo);
    };

    const imgData = "data:image/png;base64," + props.b64Img;

    return (
        //<Card className="gamecard">
            <img className={styles.gamecard} onClick={onCardClick} src={imgData} />
        //</Card>
    );
};

export default GameCard;