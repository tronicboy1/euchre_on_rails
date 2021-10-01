import React from "react";
import ChatBox from "./Chat/ChatBox";
import ActionCableProvider from "./Helpers/ActionCableProvider";

import styles from "./App.module.css";

import Interface from "./Interface/Interface";

const App = (props) => {
  return (
    <ActionCableProvider
      roomId={props.roomId}
      userId={props.userId}
      username={props.username}
      playerNo={props.playerNo}
    >
      <div className={styles.display}>
        <Interface />
        <ChatBox />
      </div>
    </ActionCableProvider>
  );
};

export default App;
