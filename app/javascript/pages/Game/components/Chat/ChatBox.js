import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";

import Card from "../../../../components/UI/Card";
import Button from "../../../../components/UI/Button";

import styles from "./ChatBox.module.css";
import InputBar from "./InputBar";
import ChatText from "./ChatText";
import ActionCableContext from "../Helpers/ActionCableContext";

const ChatBox = ({ settingsModal }) => {
  const chat = useSelector((state) => state.chat);
  const context = useContext(ActionCableContext);
  const gameState = useSelector((state) => state.gameState);

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
    
  };
  const toggleSettings = () => {
    settingsModal.setShow(true);
  };

  const noButtons = gameState.status !== "pickup_or_pass" && gameState.status !== "call_trump" && gameState.status !== "loner_check" && !gameState.showStartButton;

  return (
    <Card
      style={{
        marginTop:
          noButtons
            ? "91vh"
            : !gameState.showStartButton
            ? "101vh"
            : "1rem",
      }}
      className2={toggleText !== "Toggle Chat" && "highlight"}
      className="chat-box"
    >
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
        <Button
          style={{ height: "50px", marginTop: "0.5rem" }}
          onClick={toggleSettings}
        >
          Options
        </Button>
      </div>
    </Card>
  );
};

export default React.memo(ChatBox);
