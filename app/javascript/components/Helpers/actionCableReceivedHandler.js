const actionCableReceivedHandler = (data, setMessages, setGameState) => {
  if (data.message) {
    setMessages((prevState) => {
      return [
        {
          id: prevState[0].id + 1,
          content: data.message,
          username: data.username,
        },
        ...prevState,
      ];
    });
  }
  if (data.status) {
    console.log("status change", data);
    setGameState({ type: "STATUS_CHANGE", status: data.status });
  }
  if (data.img) {
    if (data.kitty) {
      setGameState({ type: "RECEIVE_KITTY", b64Img: data.img });
    } 
    if (data.playerNo) {
      console.log("Card received");
      setGameState({
        type: "RECEIVE_PLAYER_CARD",
        b64Img: data.img,
        playerNo: data.playerNo,
        cardNo: data.cardNo,
      });
    }
  }
  if (data.gameupdate) {
    setGameState({ type: "GAME_UPDATE", gameUpdateType: data.type, content: data.gameupdate, player: data.player });
  }
  if (data.clear) {
    setGameState({type: "NEW_HAND"});
  }
};

export default actionCableReceivedHandler;
