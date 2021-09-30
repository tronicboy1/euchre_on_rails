const hideCard = (card,cardNo) => {
    if (card.cardNo === cardNo) {
        card.show = false;
        return card;
    }
    return card;
}

const gameReducer = (prev, action, playerNo) => {
  if (action.type === "CHANGE_INTERFACE") {
    console.log(action);
    return { ...prev, showButtons: action.state };
  }
  if (action.type === "RECEIVE_PLAYER_CARD" && action.playerNo === prev.playerNo) {
    console.log(action);
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
  if (action.type === "HIDE_CARD") {
      const updatedPlayerCards = prev.playerCards.map(card => hideCard(card,action.cardNo));
      return { ...prev, playerCards: updatedPlayerCards};
  }
  if (action.type === "GAME_UPDATE") {
      return {...prev, gameUpdate: action.content};
  }
};

export default gameReducer;
