import React from "react";
import ActionCableProvider from "./components/Helpers/ActionCableProvider";
import useModal from "../../components/hooks/use-modal";

import styles from "./Game.module.css";

import Interface from "./components/Interface/Interface";
import ChatBox from "./components/Chat/ChatBox";
import Settings from "./components/Helpers/Settings";

const Game = () => {
  const settingsModal = useModal();
  return (
    <ActionCableProvider>
      {settingsModal.show && <Settings fading={settingsModal.fading} hide={settingsModal.hide} />}
      <div className={styles.display}>
        <Interface />
        <ChatBox settingsModal={settingsModal} />
      </div>
    </ActionCableProvider>
  );
};

export default Game;
