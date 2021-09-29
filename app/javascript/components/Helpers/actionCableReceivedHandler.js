const actionCableReceivedHanlder = (data,setChatBox) => {
  if (typeof data.message !== "undefined") {
    setChatBox((prevState) => {
      return [...prevState, data.message];
    });
  }
};

export default actionCableReceivedHanlder;