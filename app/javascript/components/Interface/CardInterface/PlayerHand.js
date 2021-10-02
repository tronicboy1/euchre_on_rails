import React, { useCallback, useContext } from "react";
import ActionCableContext from "../../Helpers/ActionCableContext";

import styles from "./PlayerHand.module.css";

import GameCard from "../../UI/GameCard";
import Card from "../../UI/Card";

const PlayerCards = React.memo(({ cards, onCardClick }) => {
  if (cards.length >= 5) {
    return cards
      .filter((card) => card.show)
      .map((card) => (
        <GameCard
          key={card.cardNo}
          cardNo={card.cardNo}
          b64Img={card.b64Img}
          onClick={onCardClick}
        />
      ));
  }
  return <div className={styles.playerhand}>Loading Cards</div>;
});

const PlayerHand = () => {
  const context = useContext(ActionCableContext);
  const status = context.gameState.status;

  const onCardClick = useCallback((cardNo) => {
    if (status === "turn" || status === "throw_away_card") {
      context.roomChannel.send({
        type: "gamecontrol",
        command: cardNo,
        id: context.userId,
      });
    }
  });

  return (
    <Card>
      <div className={styles.playerhand}>
        <PlayerCards cards={context.gameState.playerCards} onCardClick={onCardClick}/>
      </div>
    </Card>
  );
};

export default PlayerHand;
