import React, { useRef } from "react";

import styles from "./ChatText.module.css";


const ChatText = (props) => {
  const bottomOfList = useRef();

  return (
    <ul className={styles.text}>
      {props.messages
        ? props.messages.map((message) => (
            <li key={message.id}>{message.content}</li>
          ))
        : "Not connected."}
        <li ref={bottomOfList} />
    </ul>
  );
};

export default ChatText;
