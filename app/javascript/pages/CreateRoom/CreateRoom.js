import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import useModal from "../../components/hooks/use-modal";

import styles from "./CreateRoom.module.css";

import Card from "../../components/UI/Card";
import Button from "../../components/UI/Button";
import GameUpdates from "./GameUpdates";
import Options from "./Options";
import CheckInvites from "./CheckInvites";
import NewRoomForm from "./NewRoomForm";

const CreateRoom = ({ isAuth }) => {
  //redirect if not authenticated
  if (!isAuth) {
    return <Redirect to="/authentication" />;
  }
  //redux selectors
  const username = useSelector((state) => state.auth.username);
  const userId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.csrfToken);

  //state
  const settingsModal = useModal();

  //functions
  const toggleSettings = () => {
    settingsModal.setShow(true);
  };

  return (
    <>
      {settingsModal.show && <Options fading={settingsModal.fading} hide={settingsModal.hide} />}
      <div className={styles.banner}>
        <h1>Welcome back, {username}</h1>
      </div>
      <CheckInvites token={token} userId={userId} />
      <GameUpdates />
      <NewRoomForm token={token} userId={userId} />
      <Card className="form">
        <Button style={{ width: "100%" }} onClick={toggleSettings}>
          Options
        </Button>
      </Card>
    </>
  );
};

export default CreateRoom;
