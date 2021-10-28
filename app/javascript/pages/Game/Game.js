import React, { useState } from "react";
import ActionCableProvider from "./components/Helpers/ActionCableProvider";

import styles from "./Game.module.css";

import Interface from "./components/Interface/Interface";
import ChatBox from "./components/Chat/ChatBox";
import Settings from "./components/Helpers/Settings";

const Game = () => {
  const [showSettings, setShowSettings] = useState(false);
  return (
    <ActionCableProvider>
      {showSettings && <Settings setShowSettings={setShowSettings} />}
      <div className={styles.display}>
        <Interface />
        <ChatBox setShowSettings={setShowSettings} />
      </div>
    </ActionCableProvider>
  );
};

export default Game;
