const hideCard = (card, cardNo) => {
  if (card.cardNo === cardNo) {
    card.show = false;
    return card;
  }
  return card;
};

const gameReducer = (prev, action, playerNo) => {
  if (action.type === "STATUS_CHANGE") {
    return { ...prev, status: action.status };
  }
  if (
    action.type === "RECEIVE_PLAYER_CARD" &&
    action.playerNo === prev.playerNo
  ) {
    //reset cards array if cards are longer than 6, ie a new hand was dealt
    if (prev.playerCards.length >= 5) {
    }
    return {
      ...prev,
      playerCards: [
        ...prev.playerCards,
        {
          b64Img: action.b64Img,
          cardNo: action.cardNo,
          playerNo: action.playerNo,
          show: true,
        },
      ],
    };
  }
  if (action.type === "RECEIVE_KITTY") {
    return { ...prev, kitty: { b64Img: action.b64Img, show: true } };
  }
  if (action.type === "PLAYED_CARD") {
    if (action.playerNo === "p1") {
      return {
        ...prev,
        playedCards: { ...prev.playedCards, p1: action.b64Img },
      };
    }
    if (action.playerNo === "p2") {
      return {
        ...prev,
        playedCards: { ...prev.playedCards, p2: action.b64Img },
      };
    }
    if (action.playerNo === "p3") {
      return {
        ...prev,
        playedCards: { ...prev.playedCards, p3: action.b64Img },
      };
    }
    if (action.playerNo === "p4") {
      return {
        ...prev,
        playedCards: { ...prev.playedCards, p4: action.b64Img },
      };
    }
  }
  if (action.type === "HIDE_CARD") {
    const updatedPlayerCards = prev.playerCards.map((card) =>
      hideCard(card, action.cardNo)
    );
    return { ...prev, playerCards: updatedPlayerCards };
  }
  if (action.type === "GAME_UPDATE") {
    if (action.gameUpdateType === "GAME_TELOP") {
      return {
        ...prev,
        gameUpdate: { ...prev.gameUpdate, gameTelop: action.content },
      };
    }
    if (action.gameUpdateType === "DEALER") {
      return {
        ...prev,
        gameUpdate: { ...prev.gameUpdate, dealer: action.content },
      };
    }
    if (action.gameUpdateType === "ORDER_TRUMP") {
      return {
        ...prev,
        gameUpdate: {
          ...prev.gameUpdate,
          trump: action.content,
          orderedPlayer: action.player,
        },
      };
    }
    if (action.gameUpdateType === "TRICKS") {
      return {
        ...prev,
        gameUpdate: {
          ...prev.gameUpdate,
          team1Tricks: action.team1Tricks,
          team2Tricks: action.team2Tricks,
        },
      };
    }
  }
  if (action.type === "DEALER") {
    return { ...prev, dealer: action.content };
  }
  if (action.type === "CLEAR_BOARD") {
    return { ...prev, playedCards: {} };
  }
  if (action.type === "CLEAR_HAND") {
    return { ...prev, playerCards: [] };
  }
  if (action.type === "NEW_HAND") {
    return {
      ...prev,
      playerCards: [],
      kitty: {},
      playedCards: {},
    };
  }
  return prev;
};

export default gameReducer;
