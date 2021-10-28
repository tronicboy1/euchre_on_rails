import React from "react";
import Modal from "../../../../components/UI/Modal";
import Button from "../../../../components/UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { leaveRoom, logoutUser } from "../../../../store/auth-actions";

const Settings = (props) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.csrfToken);
  const roomId = useSelector(state => state.auth.roomId);
  console.log(token, roomId);
  const handleLogout = () => {
    dispatch(logoutUser(token, roomId));
  };
  const handleLeaveRoom = () => {
    dispatch(leaveRoom(token, roomId));
  };
  return (
    <Modal
      onClick={() => {
        props.setShowSettings(false);
      }}
    >
      <Button onClick={handleLeaveRoom}>Leave Room</Button>
      <Button onClick={handleLogout} style={{ marginTop: "1rem" }}>
        Logout
      </Button>
    </Modal>
  );
};

export default Settings;
