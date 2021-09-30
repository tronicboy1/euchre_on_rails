import React, { useEffect, useReducer, useState } from "react";

import ActionCableContext from "./ActionCableContext";
import consumer from "../../channels/consumer";
import actionCableReceivedHanlder from "./actionCableReceivedHandler";
import gameReducer from "./gameReducer";

const ActionCableProvider = (props) => {
  const [messages, setMessages] = useState([{id: 0, content: 'Welcome to Euchre on Rails!'}]);
  const [roomChannel, setRoomChannel] = useState(null);
  const [gameState, setGameState] = useReducer(gameReducer,{showButtons: false});
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
          actionCableReceivedHanlder(data, setMessages, setGameState);
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
    messages: messages,
    gameState: gameState 
  };

  return (
    <ActionCableContext.Provider value={cableContext}>
      {props.children}
    </ActionCableContext.Provider>
  );
};

export default ActionCableProvider;
