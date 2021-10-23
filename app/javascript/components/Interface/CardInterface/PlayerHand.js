import React, { useCallback, useContext, useEffect, useState } from "react";
import ActionCableContext from "../../Helpers/ActionCableContext";

import styles from "./PlayerHand.module.css";

import GameCard from "../../UI/GameCard";
import Card from "../../UI/Card";
import { useSelector } from "react-redux";

const PlayerCards = React.memo(({ cards, onCardClick, status }) => {
  if (cards.length !== 5 && status !== "turn") {
    return <div className={styles.playerhand}>Loading Cards</div>;
  }
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
});

const PlayerHand = () => {
  const context = useContext(ActionCableContext);
  const cards = useSelector((state) => state.gameState.playerCards);
  const status = useSelector((state) => state.gameState.status);
  const currentPlayer = useSelector((state) => state.gameState.currentPlayer);
  const playerNo = useSelector((state) => state.gameState.playerNo);

  const [highlightBackground, setHighlightBackground] = useState(false);

  useEffect(() => {
    if (currentPlayer === playerNo && status === "turn" && cards.length > 0) {
      setHighlightBackground(true);
    } else {
      setHighlightBackground(false);
    }
  }, [currentPlayer, status]);

  const onCardClick = useCallback((cardNo) => {
    if (status === "turn" || status === "throw_away_card") {
      context.roomChannel.send({
        type: "gamecontrol",
        command: cardNo,
        id: context.userId,
      });
      setHighlightBackground(false);
    }
  });

  return (
    <Card className={highlightBackground && "highlight"}>
      <div className={styles.playerhand}>
        <PlayerCards
          cards={cards}
          onCardClick={onCardClick}
          status={status}
        />
      </div>
    </Card>
  );
};

export default PlayerHand;
