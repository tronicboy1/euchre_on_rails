import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import styles from "./CreateRoom.module.css";

import Card from "../../components/UI/Card";
import Button from "../../components/UI/Button";
import { checkInvites, getGameUpdates } from "../../store/auth-actions";
import GameUpdates from "./GameUpdates";
import Options from "./Options";
import CheckInvites from "./CheckInvites";
import NewRoomForm from "./NewRoomForm";

let isInitial = true;

const CreateRoom = ({ isAuth }) => {
  //redirect if not authenticated
  if (!isAuth) {
    return <Redirect to="/authentication" />;
  }
  const dispatch = useDispatch();
  //redux selectors
  const username = useSelector((state) => state.auth.username);
  const userId = useSelector((state) => state.auth.userId);
  
  const token = useSelector((state) => state.auth.csrfToken);

  //state
  const [showSettings, setShowSettings] = useState(false);

  //fetch gameupdates when loaded and check for updates/refresh info
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      dispatch(checkInvites(token, userId));
    }
    dispatch(getGameUpdates("game-updates/json", token));
  }, []);
  //functions
  const toggleSettings = () => {
    setShowSettings((prev) => !prev);
  };

  return (
    <>
      {showSettings && <Options setShowSettings={setShowSettings} />}
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
