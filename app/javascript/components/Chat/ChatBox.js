import React, { useContext, useState, useRef, useEffect } from "react";

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

  console.log(toggleChat);

  const onToggleChat = () => {
      setToggleChat((prevState) => {return !prevState})
  };
  
  return (
    <Card>
      <div className={styles["chat-box"]}>
        <Button
          onClick={onToggleChat}
          className={toggleChat ? "chat-toggle" : "chat-toggle__hidden"}
        >
          {toggleText}
        </Button>
        {toggleChat && <>
            <ChatText messages={context.messages}/>
            <InputBar />
            </>
        }
        
      </div>
    </Card>
  );
};

export default React.memo(ChatBox);
