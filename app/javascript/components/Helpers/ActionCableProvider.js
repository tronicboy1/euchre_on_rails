import React, { useEffect, useReducer, useState } from "react";

import ActionCableContext from "./ActionCableContext";
import consumer from "../../channels/consumer";
import actionCableReceivedHanlder from "./actionCableReceivedHandler";
import gameReducer from "./gameReducer";

const ActionCableProvider = (props) => {
  const [messages, setMessages] = useState([
    { id: 0, content: "Welcome to Euchre on Rails!" },
  ]);
  const [roomChannel, setRoomChannel] = useState(null);
  const [gameState, setGameState] = useReducer(gameReducer, {
    playerNo: props.playerNo,
    showButtons: true,
    kitty: {},
    playerCards: [],
  });
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
        connected() {},
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
    playerNo: props.playerNo,
    username: props.username,
    roomChannel: roomChannel,
    messages: messages,
    gameState: gameState,
  };

  return (
    <ActionCableContext.Provider value={cableContext}>
      {props.children}
    </ActionCableContext.Provider>
  );
};

export default ActionCableProvider;
