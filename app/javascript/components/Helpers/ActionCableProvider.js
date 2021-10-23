import React, { useEffect, useReducer, useState } from "react";

import ActionCableContext from "./ActionCableContext";
import consumer from "../../channels/consumer";
import actionCableReceivedHandler from "./actionCableReceivedHandler";
import gameReducer from "./gameReducer";
import { useDispatch } from "react-redux";
import { gameStateActions } from "../../store/store";

const ActionCableProvider = (props) => {
  const dispatch = useDispatch();
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

  console.log(gameState);
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
          actionCableReceivedHandler(data, dispatch, setGameState);
        },
      }
    );
    setRoomChannel(roomChannel);
    dispatch(gameStateActions.setPlayerNo(props.playerNo))
  }, []);

  const cableContext = {
    roomId: props.roomId,
    userId: props.userId,
    playerNo: props.playerNo,
    username: props.username,
    playerNames: props.playerNames,
    roomChannel: roomChannel,
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
