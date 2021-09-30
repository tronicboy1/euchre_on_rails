const actionCableReceivedHanlder = (data, setMessages, setGameState) => {
  if (typeof data.message !== "undefined") {
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
  if (typeof data.interfaceState !== "undefined") {
    setGameState({ type: "CHANGE_INTERFACE", state: data.interfaceState });
  }
  if (typeof data.img !== "undefined") {
    if (typeof data.kitty) {
      setGameState({ type: "RECEIVE_KITTY", b64Img: data.img });
    } 
    if (typeof data.playerNo !== "undefined") {
      console.log("Card received");
      setGameState({
        type: "RECEIVE_PLAYER_CARD",
        b64Img: data.img,
        playerNo: data.playerNo,
        cardNo: data.cardNo,
      });
    }
  }
};

export default actionCableReceivedHanlder;
