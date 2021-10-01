import React, { useEffect, useReducer, useState } from "react";

import ActionCableContext from "./ActionCableContext";
import consumer from "../../channels/consumer";
import actionCableReceivedHandler from "./actionCableReceivedHandler";
import gameReducer from "./gameReducer";

const ActionCableProvider = (props) => {
  const [messages, setMessages] = useState([
    { id: 0, content: "Welcome to Euchre on Rails!" },
  ]);
  const [roomChannel, setRoomChannel] = useState(null);
  const [gameState, setGameState] = useReducer(gameReducer, {
    playerNo: props.playerNo,
    status: true,
    kitty: {},
    playerCards: [],
    playedCards: {
      p1: "",
      p2: "",
      p3: "",
      p4: ""
    },
    gameUpdate: {
      gameTelop: "",
      dealer: "",
      trump: "",
      orderedPlayer: "",
      team1Score: "",
      team2Score: "",
      team1Tricks: "",
      team2Tricks: ""
    },
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
          actionCableReceivedHandler(data, setMessages, setGameState);
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
    setGameState: setGameState,
  };

  return (
    <ActionCableContext.Provider value={cableContext}>
      {props.children}
    </ActionCableContext.Provider>
  );
};

export default ActionCableProvider;
