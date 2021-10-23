const actionCableReceivedHandler = (data, setMessages, setGameState) => {
  if (data.message) {
    setMessages(data);
  }
  if (data.status) {
    setGameState({ type: "STATUS_CHANGE", status: data.status });
  }
  if (data.currentPlayer) {
    setGameState({ type: "CURRENT_PLAYER", currentPlayer: data.currentPlayer })
  }
  if (data.img) {
    if (data.kitty) {
      setGameState({ type: "RECEIVE_KITTY", b64Img: data.img });
    }
    if (data.playerNo) {
      setGameState({
        type: "RECEIVE_PLAYER_CARD",
        b64Img: data.img,
        playerNo: data.playerNo,
        cardNo: data.cardNo,
      });
    }
    if (data.playedCard) {
      setGameState({
        type: "PLAYED_CARD",
        b64Img: data.img,
        playerNo: data.playedCard,
      });
    }
  }
  if (data.hideCard) {
    setGameState({ type: "HIDE_CARD", cardNo: data.cardNo, playerNo: data.playerNo });
  }
  if (data.gameupdate) {
    setGameState({
      type: "GAME_UPDATE",
      gameUpdateType: data.type,
      content: data.gameupdate,
      player: data.player,
      team1Tricks: data.team1Tricks,
      team2Tricks: data.team2Tricks,
      team1Score: data.team1Score,
      team2Score: data.team2Score,
    });
  }
  if (data.clear) {
    setGameState({ type: "NEW_HAND" });
  }
  if (data.clearBoard) {
    setGameState({ type: "CLEAR_BOARD" });
  }
  if (data.clearHand) {
    setGameState({ type: "CLEAR_HAND" });
  }
};

export default actionCableReceivedHandler;
