import React, { useState, useContext } from "react";

import styles from "./InputBar.module.css";

import ActionCableContext from "../Helpers/ActionCableContext";

import Button from "../UI/Button";
import Input from "../UI/Input";

const InputBar = (props) => {
  const context = useContext(ActionCableContext);
  const [input, setInput] = useState("");

  const onInput = (event) => {
    setInput(event.target.value);
  };

  const keyPress = (event) => {
    if (event.which === 13) {
      onSubmit(event);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    context.roomChannel.send({
      type: "chat",
      message: context.username + " : " + input,
      online: context.userId,
      username: context.username,
    });
    setInput("");
  };
  return (
    <div className={styles["input-bar"]}>
      <Input
        onChange={onInput}
        onKeyPress={keyPress}
        value={input}
        className="chat-input"
      />
      <Button className="chat-button" onClick={onSubmit}>
        Send
      </Button>
    </div>
  );
};

export default InputBar;
