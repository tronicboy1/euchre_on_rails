import React from "react";

import styles from "./ChatText.module.css";

const ChatText = (props) => {
    return (
        <ul className={styles.text}>
          {props.messages
            ? props.messages.map((message) => (
                <li key={message.id}>{message.content}</li>
              ))
            : "Not connected."}
        </ul>
    );
}

export default ChatText;