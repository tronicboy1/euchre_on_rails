import React, { useEffect, useState } from "react";

import ActionCableContext from "./ActionCableContext";
import consumer from "../../channels/consumer";

const ActionCableProvider = (props) => {
  const [chatBox, setChatBox] = useState([]);
  const [roomChannel, setRoomChannel] = useState(null);
  //setup activecable connection
  useEffect(() => {
      console.log('use effect',props)
    const roomChannel = consumer.subscriptions.create(
      {
        channel: "RoomcontrolChannel",
        room_id: props.roomId,
        username: props.username,
        user_id: props.userId,
      },
      {
        connected() {
          setChatBox((prevState) => {
            return [...prevState, `${props.username} Joined the Room!`];
          });
        },
        disconnected() {
          // Called when the subscription has been terminated by the server
        },
        received(data) {
          // Called when there's incoming data on the websocket for this channel
        },
      }
    );
    setRoomChannel(roomChannel);
    console.log(roomChannel);
  }, []);

  

  const cableContext = {
    roomId: props.roomId,
    userId: props.userId,
    username: props.username,
    roomChannel: roomChannel,
    chatBox: chatBox,
  };

  return (
    <ActionCableContext.Provider value={cableContext}>
      {props.children}
    </ActionCableContext.Provider>
  );
};

export default ActionCableProvider;
