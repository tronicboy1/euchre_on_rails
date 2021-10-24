import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";

import Card from "../UI/Card";
import Button from "../UI/Button";

import styles from "./ChatBox.module.css";
import InputBar from "./InputBar";
import ChatText from "./ChatText";
import ActionCableContext from "../Helpers/ActionCableContext";

const ChatBox = (props) => {
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
  const toggleSettings = () => {
    props.setShowSettings(prev => !prev);
  };

  return (
    <Card style={{ marginTop: "100vh" }} className2={toggleText !== "Toggle Chat" && "highlight"} className="chat-box">
      <div className={styles["chat-box"]}>
        <Button
          onClick={onToggleChat}
          className={toggleChat ? "chat-toggle" : "chat-toggle__hidden"}
        >
          {toggleText}
        </Button>
        {toggleChat && (
          <>
            <ChatText messages={chat.messages} />
            <InputBar />
          </>
        )}
        <Button style={{ height: "50px", marginTop: "0.5rem" }} onClick={toggleSettings}>Options</Button>
      </div>
    </Card>
  );
};

export default React.memo(ChatBox);
