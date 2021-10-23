import React, { useEffect, useState } from "react";

import ActionCableContext from "./ActionCableContext";
import consumer from "../../channels/consumer";
import actionCableReceivedHandler from "./actionCableReceivedHandler";
import { useDispatch } from "react-redux";
import { gameStateActions } from "../../store/store";

const ActionCableProvider = (props) => {
  const dispatch = useDispatch();
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
    dispatch(gameStateActions.setPlayerNo(props.playerNo))
  }, []);

  const cableContext = {
    roomId: props.roomId,
    userId: props.userId,
    playerNo: props.playerNo,
    username: props.username,
    playerNames: props.playerNames,
    roomChannel: roomChannel,
  };

  return (
    <ActionCableContext.Provider value={cableContext}>
      {props.children}
    </ActionCableContext.Provider>
  );
};

export default ActionCableProvider;
