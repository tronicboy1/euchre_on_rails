import React from "react";
import ActionCableProvider from "./Helpers/ActionCableProvider";
import { Provider } from "react-redux";
import store from "../store/store";

import styles from "./App.module.css";

import Interface from "./Interface/Interface";
import ChatBox from "./Chat/ChatBox";

const App = (props) => {
  return (
    <Provider store={store}>
      <ActionCableProvider
        roomId={props.roomId}
        userId={props.userId}
        username={props.username}
        playerNo={props.playerNo}
        playerNames={props.playerNames}
      >
        <div className={styles.display}>
          <Interface />
          <ChatBox />
        </div>
      </ActionCableProvider>
    </Provider>
  );
};

export default App;
