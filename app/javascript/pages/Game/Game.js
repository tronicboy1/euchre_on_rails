import React, { useState } from "react";
import ActionCableProvider from "./components/Helpers/ActionCableProvider";
import { Provider } from "react-redux";
import store from '../../store/store';

import styles from "./Game.module.css";

import Interface from "./components/Interface/Interface";
import ChatBox from "./components/Chat/ChatBox";
import Settings from "./components/Helpers/Settings";

const Game = (props) => {
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

export default Game;
