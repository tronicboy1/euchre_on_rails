import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";

import Card from "../UI/Card";
import Button from "../UI/Button";

import styles from "./ChatBox.module.css";
import InputBar from "./InputBar";
import ChatText from "./ChatText";
import ActionCableContext from "../Helpers/ActionCableContext";

const ChatBox = () => {
  const chat = useSelector((state) => state.chat);
  const context = useContext(ActionCableContext);

  //state management
  const [toggleText, setToggleText] = useState("Toggle Chat");
  const [toggleChat, setToggleChat] = useState(true);

  useEffect(() => {
    if (
      chat.messages[0].username &&
      chat.messages[0].username !== context.username
    ) {
      setToggleText(`New Message from ${chat.messages[0].username}`);
    }
    const timer = setTimeout(() => {
      setToggleText("Toggle Chat");
    }, 4000);
    return () => {
      clearTimeout(timer);
    };
  }, [chat.messages]);

  const onToggleChat = () => {
    setToggleChat((prevState) => {
      return !prevState;
    });
  };

  return (
    <Card className2={toggleText !== "Toggle Chat" && "highlight"} className="chat-box">
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
            <ChatText messages={chat.messages} />
            <InputBar />
          </>
        )}
      </div>
    </Card>
  );
};

export default React.memo(ChatBox);
