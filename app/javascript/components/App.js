import React, { useContext, useEffect } from "react";
import ChatBox from "./Chat/ChatBox";
import ActionCableContext from "./Helpers/ActionCableContext";
import ActionCableProvider from "./Helpers/ActionCableProvider";
import ButtonInterface from "./Interface/ButtonInterface/ButtonInterface";

import Card from "./UI/Card";

const App = (props) => {
  const context = useContext(ActionCableContext);
  return (
    <ActionCableProvider
      roomId={props.roomId}
      userId={props.userId}
      username={props.username}
      playerNo={props.playerNo}
    >
      <ChatBox />
      <Card>
        <ButtonInterface />
      </Card>
    </ActionCableProvider>
  );
};

export default App;
