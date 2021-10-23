const hideCard = (card, cardNo, playerNo) => {
  if (card.cardNo === cardNo && card.playerNo === playerNo) {
    card.show = false;
    return card;
  }
  return card;
};

const gameReducer = (prev, action, playerNo) => {
  if (action.type === "STATUS_CHANGE") {
    if (action.status === "pickup_or_pass") {
      return {
        ...prev,
        status: action.status,
        showKitty: true,
        showTelop: true,
        showBoard: true,
        showStartButton: false,
        showHand: true,
      };
    }
    if (action.status === "call_trump") {
      return {
        ...prev,
        status: action.status,
        showKitty: "PLACEHOLDER",
        showTelop: true,
        showBoard: true,
        showStartButton: false,
        showHand: true,
      };
    }
    if (action.status === "turn") {
      return {
        ...prev,
        status: action.status,
        showKitty: false,
        showTelop: true,
        showBoard: true,
        showStartButton: false,
        showHand: true,
      };
    }
    return { ...prev, status: action.status };
  }
  if (action.type === "CURRENT_PLAYER") {
    return { ...prev, currentPlayer: action.currentPlayer };
  }
  if (
    action.type === "RECEIVE_PLAYER_CARD" &&
    action.playerNo === prev.playerNo
  ) {
    //reset cards array if cards are longer than 6, ie a new hand was dealt
    if (prev.playerCards.length >= 5) {
      return {
        ...prev,
        playerCards: [
          {
            b64Img: action.b64Img,
            cardNo: action.cardNo,
            playerNo: action.playerNo,
            show: true,
          },
        ],
      };
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
    return {
      ...prev,
      kitty: { b64Img: action.b64Img, show: true },
      showHand: true,
      showBoard: true,
      showTelop: true,
      showKitty: true,
      showStartButton: false,
    };
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
      hideCard(card, action.cardNo, action.playerNo)
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
    if (action.gameUpdateType === "SCORE") {
      return {
        ...prev,
        gameUpdate: {
          ...prev.gameUpdate,
          team1Score: action.team1Score,
          team2Score: action.team2Score,
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
    if (action.playerNo === prev.playerNo) {
      return { ...prev, playerCards: [] };
    }
  }
  if (action.type === "NEW_HAND") {
    return {
      ...prev,
      playerCards: [],
      kitty: {},
      playedCards: {},
      gameUpdate: {
        ...prev.gameUpdate,
        trump: "",
        team1Tricks: 0,
        team2Tricks: 0,
        orderedPlayer: "",
      },
    };
  }
  return prev;
};

export default gameReducer;
