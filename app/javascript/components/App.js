import React from "react";
import ChatBox from "./Chat/ChatBox";
import ActionCableProvider from "./Helpers/ActionCableProvider";

import Interface from "./Interface/Interface";

const App = (props) => {
  return (
    <ActionCableProvider
      roomId={props.roomId}
      userId={props.userId}
      username={props.username}
      playerNo={props.playerNo}
    >
      <Interface />
      <ChatBox />
    </ActionCableProvider>
  );
};

export default App;
