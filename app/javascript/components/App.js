import React, { useContext, useEffect } from "react";
import ChatBox from "./Chat/ChatBox";
import ActionCableContext from "./Helpers/ActionCableContext";
import ActionCableProvider from "./Helpers/ActionCableProvider";
import ButtonInterface from "./Interface/ButtonInterface/ButtonInterface";

import Card from "./UI/Card";
import PlayerHand from "./Interface/CardInterface/PlayerHand";
import Kitty from "./Interface/Kitty/Kitty";
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
