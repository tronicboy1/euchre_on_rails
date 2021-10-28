import {
  gameStateActions,
  chatActions,
  gameUpdateActions,
} from "../../../../store/store";

const actionCableReceivedHandler = (data, dispatch) => {
  if (data.message) {
    dispatch(chatActions.addMessage(data));
  }
  if (data.status) {
    dispatch(gameStateActions.statusChange(data));
  }
  if (data.currentPlayer) {
    dispatch(gameStateActions.currentPlayer(data));
  }
  if (data.img) {
    if (data.kitty) {
      dispatch(gameStateActions.receiveKitty(data));
    }
    if (data.playerNo) {
      dispatch(gameStateActions.receivePlayerCard(data));
    }
    if (data.playedCard) {
      dispatch(gameStateActions.playedCard(data));
    }
  }
  if (data.hideCard) {
    dispatch(gameStateActions.hideCard(data));
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
  }
  if (data.clear) {
    dispatch(gameStateActions.newHand());
    dispatch(gameUpdateActions.clearUpdates());
  }
  if (data.clearBoard) {
    dispatch(gameStateActions.clearBoard());
  }
  if (data.clearHand) {
    dispatch(gameStateActions.clearHand(data));
    dispatch(gameUpdateActions.clearUpdates());
  }
};

export default actionCableReceivedHandler;
