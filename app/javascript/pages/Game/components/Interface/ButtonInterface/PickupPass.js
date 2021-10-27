import React, { useContext } from "react";
import ActionCableContext from "../../Helpers/ActionCableContext";

import styles from "./PickupPass.module.css";

import Button from "../../UI/Button";

const PickupPass = (props) => {
  const context = useContext(ActionCableContext);

  const onPass = () => {
    context.roomChannel.send({
      type: "gamecontrol",
      command: false,
      id: context.userId,
    });
  };

  const onPickup = () => {
    context.roomChannel.send({
      type: "gamecontrol",
      command: true,
      id: context.userId,
    });
  };

  return (
    <div className={styles["button-bar"]}>
      <Button className="bar-left" onClick={onPickup}>
        Pickup
      </Button>
      <Button className="bar-right" onClick={onPass}>
        Pass
      </Button>
    </div>
  );
};

export default PickupPass;
