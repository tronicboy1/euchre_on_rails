import React from "react";
import Modal from "../../../../components/UI/Modal";
import Button from "../../../../components/UI/Button";

const Settings = (props) => {
  const baseURL = `${window.location.protocol}//${
    window.location.href.split("/")[2]
  }`;
  const handleLogout = () => {
    window.location.href = baseURL + "/logout";
  };
  const handleLeaveRoom = () => {
    window.location.href = baseURL + "/game/leave";
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
