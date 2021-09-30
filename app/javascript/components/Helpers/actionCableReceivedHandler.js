const actionCableReceivedHanlder = (data, setMessages, setGameState) => {
  if (typeof data.message !== "undefined") {
    setMessages((prevState) => {
      return [{id: prevState[0].id + 1, content: data.message, username: data.username}, ...prevState];
    });
  }
  if (typeof data.interfaceState !== "undefined") {
    setGameState({type: "CHANGE_INTERFACE", state: data.interfaceState});
  }
};

export default actionCableReceivedHanlder;