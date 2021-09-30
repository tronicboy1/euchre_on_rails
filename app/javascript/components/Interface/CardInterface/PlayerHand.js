import React, { useContext } from "react";
import ActionCableContext from "../../Helpers/ActionCableContext";

import styles from "./PlayerHand.module.css";

import GameCard from "../../UI/GameCard";
import Card from "../../UI/Card";

const PlayerHand = () => {
  const context = useContext(ActionCableContext);

  const onCardClick = (cardNo) => {
    console.log("clicked", cardNo);
    if (!context.gameState.showButtons) {
        context.setGameState({type: "HIDE_CARD", cardNo: cardNo});
    context.roomChannel.send({ type: "gamecontrol", command: cardNo, id: context.userId })
    };
  };

  const PlayerCards = () => {
    if (context.gameState.playerCards.length === 5) {
      return context.gameState.playerCards
        .filter((card) => card.show)
        .map(card => 
          <GameCard
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
