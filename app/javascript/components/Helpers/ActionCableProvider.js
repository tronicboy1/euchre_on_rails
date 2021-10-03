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
    playedCards: {},
    gameUpdate: {
      gameTelop: "",
      dealer: "",
      trump: "",
      orderedPlayer: "",
      team1Score: 0,
      team2Score: 0,
      team1Tricks: "",
      team2Tricks: ""
    },
    showHand: false,
    showKitty: false,
    showTelop: false,
    showBoard: false,
    showStartButton: true,
    currentPlayer: ""
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
    playerNames: props.playerNames,
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
