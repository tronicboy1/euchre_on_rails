import React, { useEffect, useState } from "react";

import ActionCableContext from "./ActionCableContext";
import consumer from "../../channels/consumer";
import actionCableReceivedHanlder from "./actionCableReceivedHandler";

const ActionCableProvider = (props) => {
  const [chatBox, setChatBox] = useState([]);
  const [roomChannel, setRoomChannel] = useState(null);
  //setup activecable connection
  useEffect(() => {
    const roomChannel = consumer.subscriptions.create(
      {
        channel: "RoomcontrolChannel",
        room_id: props.roomId,
        username: props.username,
        user_id: props.userId,
      },
      {
        connected() {
          
        },
        disconnected() {
          // Called when the subscription has been terminated by the server
        },
        received(data) {
          console.log(data);
          actionCableReceivedHanlder(data,setChatBox);
        },
      }
    );
    setRoomChannel(roomChannel);
  }, []);

  

  const cableContext = {
    roomId: props.roomId,
    userId: props.userId,
    username: props.username,
    roomChannel: roomChannel,
    chatBox: chatBox
  };

  return (
    <ActionCableContext.Provider value={cableContext}>
      {props.children}
    </ActionCableContext.Provider>
  );
};

export default ActionCableProvider;
