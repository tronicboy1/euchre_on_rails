const actionCableReceivedHanlder = (data,setMessages) => {
  if (typeof data.message !== "undefined") {
    setMessages((prevState) => {
      return [{id: prevState[0].id + 1, content: data.message}, ...prevState];
    });
  }
};

export default actionCableReceivedHanlder;