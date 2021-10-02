import React, { useContext, useState, useEffect } from "react";

import ActionCableContext from "../Helpers/ActionCableContext";
import Card from "../UI/Card";
import Button from "../UI/Button";

import styles from "./ChatBox.module.css";
import InputBar from "./InputBar";
import ChatText from "./ChatText";

const ChatBox = () => {
  const context = useContext(ActionCableContext);

  //state management
  const [toggleText, setToggleText] = useState("Toggle Chat");
  const [toggleChat, setToggleChat] = useState(true);

  useEffect(() => {
    if (
      context.messages[0].username &&
      context.messages[0].username !== context.username
    ) {
      setToggleText(`New Message from ${context.messages[0].username}`);
    }
    const timer = setTimeout(() => {
      setToggleText("Toggle Chat");
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [context.messages]);

  const onToggleChat = () => {
    setToggleChat((prevState) => {
      return !prevState;
    });
  };

  return (
    <Card className="chat-box">
      <div className={styles["chat-box"]}>
        <Button
          onClick={onToggleChat}
          className={toggleChat ? "chat-toggle" : "chat-toggle__hidden"}
          style={{ background: toggleText != "Toggle Chat" ? "blue" : "red" }}
        >
          {toggleText}
        </Button>
        {toggleChat && (
          <>
            <ChatText messages={context.messages} />
            <InputBar />
          </>
        )}
      </div>
    </Card>
  );
};

export default React.memo(ChatBox);
