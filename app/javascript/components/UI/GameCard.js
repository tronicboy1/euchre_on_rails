import React from "react";

import Card from "./Card";

const GameCard = (props) => {
    const cardNo = props.cardNo;
    const onCardClick = () => {
        props.onClick(cardNo);
    };

    const imgData = "data:image/png;base64," + props.b64Img;

    return (
        <Card className="gamecard">
            <img onClick={onCardClick} src={imgData} />
        </Card>
    );
};

export default GameCard;