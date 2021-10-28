import React, { useEffect, useState } from "react";

import ActionCableContext from "./ActionCableContext";
import consumer from "../../../../channels/consumer";
import actionCableReceivedHandler from "./actionCableReceivedHandler";
import { useDispatch, useSelector } from "react-redux";
import { gameStateActions } from "../../../../store/store";

const ActionCableProvider = (props) => {
  const dispatch = useDispatch();
  const roomId = useSelector(state => state.auth.roomId);
  const userId = useSelector(state => state.auth.userId);
  const username = useSelector(state => state.auth.username);
  const playerNames = useSelector(state => state.auth.playerNames);
  const playerNo = useSelector(state => state.gameState.playerNo);
  const [roomChannel, setRoomChannel] = useState(null);

  //setup activecable connection
  useEffect(() => {
    const roomChannel = consumer.subscriptions.create(
      {
        channel: "RoomcontrolChannel",
        room_id: roomId,
        username: username,
        user_id: userId,
      },
      {
        connected() {},
        disconnected() {
          // Called when the subscription has been terminated by the server
        },
        received(data) {
          actionCableReceivedHandler(data, dispatch);
        },
      }
    );
    setRoomChannel(roomChannel);
  }, [roomId,userId,username]);

  const cableContext = {
    roomId,
    userId,
    playerNo,
    username,
    playerNames,
    roomChannel,
  };

  return (
    <ActionCableContext.Provider value={cableContext}>
      {props.children}
    </ActionCableContext.Provider>
  );
};

export default ActionCableProvider;
