import React from "react";

import styles from "./App.module.css";

import Interface from "./Interface/Interface";
import ChatBox from "./Chat/ChatBox";

const WrappedApp = (props) => {
    return (
      <div className={styles.display}>
        <Interface />
        <ChatBox />
      </div>
    );
  };

  export default WrappedApp;