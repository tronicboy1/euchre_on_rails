import React, { useContext } from "react";
import ActionCableContext from "../../Helpers/ActionCableContext";

import styles from "./PlayerHand.module.css";

import GameCard from "../../UI/GameCard";
import Card from "../../UI/Card";

const PlayerHand = () => {
  const context = useContext(ActionCableContext);
  const status = context.gameState.status;

  const onCardClick = (cardNo) => {
    console.log("clicked", cardNo);
    if (status === "turn" || status === "throw_away_card") {
        context.setGameState({type: "HIDE_CARD", cardNo: cardNo});
    context.roomChannel.send({ type: "gamecontrol", command: cardNo, id: context.userId })
    };
  };

  const PlayerCards = () => {
    if (context.gameState.playerCards.length >= 5) {
      return context.gameState.playerCards
        .filter((card) => card.show)
        .map(card => 
          <GameCard
            key={card.cardNo}
            cardNo={card.cardNo}
            b64Img={card.b64Img}
            onClick={onCardClick}
          />
        );
    }
    return (
        <div>No Cards</div>
    );
  };

  return (
    <Card>
      <div className={styles.playerhand}>
        <PlayerCards />
      </div>
    </Card>
  );
};

export default PlayerHand;
