import {
  gameStateActions,
  chatActions,
  gameUpdateActions,
} from "../../store/store";

const actionCableReceivedHandler = (data, dispatch, setGameState) => {
  if (data.message) {
    dispatch(chatActions.addMessage(data));
  }
  if (data.status) {
    dispatch(gameStateActions.statusChange(data));
    setGameState({ type: "STATUS_CHANGE", status: data.status });
  }
  if (data.currentPlayer) {
    dispatch(gameStateActions.currentPlayer(data));
    setGameState({ type: "CURRENT_PLAYER", currentPlayer: data.currentPlayer });
  }
  if (data.img) {
    if (data.kitty) {
      setGameState({ type: "RECEIVE_KITTY", b64Img: data.img });
    }
    if (data.playerNo) {
      dispatch(gameStateActions.receivePlayerCard(data));
      setGameState({
        type: "RECEIVE_PLAYER_CARD",
        b64Img: data.img,
        playerNo: data.playerNo,
        cardNo: data.cardNo,
      });
    }
    if (data.playedCard) {
      dispatch(gameStateActions.playedCard(data));
      setGameState({
        type: "PLAYED_CARD",
        b64Img: data.img,
        playerNo: data.playedCard,
      });
    }
  }
  if (data.hideCard) {
    dispatch(gameStateActions.hideCard(data));
    setGameState({
      type: "HIDE_CARD",
      cardNo: data.cardNo,
      playerNo: data.playerNo,
    });
  }
  if (data.gameupdate) {
    if (data.type === "GAME_TELOP") {
      dispatch(gameUpdateActions.gameTelop(data.gameupdate));
    }
    if (data.type === "DEALER") {
      dispatch(gameUpdateActions.dealer(data.gameupdate));
    }
    if (data.type === "ORDER_TRUMP") {
      dispatch(
        gameUpdateActions.orderTrump({
          trump: data.gameupdate,
          player: data.player,
        })
      );
    }
    if (data.type === "TRICKS") {
      dispatch(
        gameUpdateActions.tricks({
          team1Tricks: data.team1Tricks,
          team2Tricks: data.team2Tricks,
        })
      );
    }
    if (data.type === "SCORE") {
      dispatch(
        gameUpdateActions.score({
          team1Score: data.team1Score,
          team2Score: data.team2Score,
        })
      );
    }
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
    dispatch(gameStateActions.newHand(data));
    setGameState({ type: "NEW_HAND" });
  }
  if (data.clearBoard) {
    dispatch(gameStateActions.clearBoard(data));
    setGameState({ type: "CLEAR_BOARD" });
  }
  if (data.clearHand) {
    dispatch(gameStateActions.clearHand(data));
    setGameState({ type: "CLEAR_HAND" });
  }
};

export default actionCableReceivedHandler;
