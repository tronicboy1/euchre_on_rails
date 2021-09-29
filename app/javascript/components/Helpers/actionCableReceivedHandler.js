const actionCableReceivedHanlder = (data,setMessages) => {
  if (typeof data.message !== "undefined") {
    setMessages((prevState) => {
      return [...prevState, {id: prevState[prevState.length - 1].id + 1, content: data.message}];
    });
  }
};

export default actionCableReceivedHanlder;