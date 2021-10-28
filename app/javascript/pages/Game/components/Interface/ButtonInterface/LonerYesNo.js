import React, { useContext } from "react";
import ActionCableContext from "../../Helpers/ActionCableContext";
import Button from "../../../../../components/UI/Button";

import styles from "./LonerYesNo.module.css";

const LonerYesNo = () => {
  const context = useContext(ActionCableContext);

  const onYes = () => {
    context.roomChannel.send({
      type: "gamecontrol",
      command: true,
      id: context.userId,
    });
  };

  const onNo = () => {
    context.roomChannel.send({
      type: "gamecontrol",
      command: false,
      id: context.userId,
    });
  };

  return (
    <div className={styles["button-bar"]}>
      <Button className="bar-left" onClick={onYes}>Yes</Button>
      <Button className="bar-right" onClick={onNo}>No</Button>
    </div>
  );
};

export default LonerYesNo;
