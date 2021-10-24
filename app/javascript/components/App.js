import React, { useState } from "react";
import ActionCableProvider from "./Helpers/ActionCableProvider";
import { Provider } from "react-redux";
import store from "../store/store";

import styles from "./App.module.css";

import Interface from "./Interface/Interface";
import ChatBox from "./Chat/ChatBox";
import Settings from "./Settings";

const App = (props) => {
  const [showSettings, setShowSettings] = useState(false);
  return (
    <Provider store={store}>
      <ActionCableProvider
        roomId={props.roomId}
        userId={props.userId}
        username={props.username}
        playerNo={props.playerNo}
        playerNames={props.playerNames}
      >
        {showSettings && <Settings setShowSettings={setShowSettings} />}
        <div className={styles.display}>
          <Interface />
          <ChatBox setShowSettings={setShowSettings}/>
        </div>
      </ActionCableProvider>
    </Provider>
  );
};

export default App;
