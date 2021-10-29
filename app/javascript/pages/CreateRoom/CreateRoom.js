import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";

import styles from "./CreateRoom.module.css";

import Card from "../../components/UI/Card";
import Select from "../../components/UI/Select";
import Button from "../../components/UI/Button";
import {
  checkInvites,
  getGameUpdates,
  sendCreateRoomRequest,
} from "../../store/auth-actions";
import GameUpdates from "./GameUpdates";
import Options from "./Options";
import CheckInvites from "./CheckInvites";

let isInitial = true;

const CreateRoom = ({ isAuth }) => {
  //redirect if not authenticated
  if (!isAuth) {
    return <Redirect to="/authentication"/>
  }
  const dispatch = useDispatch();
  //redux selectors
  const username = useSelector((state) => state.auth.username);
  const userId = useSelector((state) => state.auth.userId);
  const users = useSelector((state) => state.auth.users);
  const gameUpdates = useSelector((state) => state.auth.gameUpdates);
  const token = useSelector((state) => state.auth.csrfToken);
  const createRoomErrors = useSelector((state) => state.auth.createRoomErrors);

  //state
  const [formError, setFormError] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  //refs
  const p2Ref = useRef("");
  const p3Ref = useRef("");
  const p4Ref = useRef("");

  //effects
  //fetch gameupdates when loaded and check for updates/refresh info
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      dispatch(checkInvites(token, userId));
    }
    dispatch(getGameUpdates("game-updates/json", token));
  }, []);
  //functions
  const submitHandler = (e) => {
    e.preventDefault();
    const p2 = p2Ref.current.value;
    const p3 = p3Ref.current.value;
    const p4 = p4Ref.current.value;
    const p2IsValid = p2 === "computer" ? true : p2 !== p3 && p2 !== p4;
    const p3IsValid = p3 === "computer" ? true : p3 !== p2 && p3 !== p4;
    const p4IsValid = p4 === "computer" ? true : p4 !== p2 && p4 !== p3;
    const isValid = p2IsValid && p3IsValid && p4IsValid;
    if (isValid) {
      const playerList = { p1: userId, p2, p3, p4 };
      dispatch(sendCreateRoomRequest(playerList, token));
    } else {
      setFormError(true);
    }
  };

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
      <GameUpdates gameUpdates={gameUpdates} />
      <Card className="form">
          <h3 style={{ marginBottom: "1.5rem" }}>Start a new game</h3>
          {formError && <p>Looks like you selected the same user twice!</p>}
          {createRoomErrors && <p>You invited a user who is already in a room.</p>}
          <form className={styles.form} onSubmit={submitHandler}>
            <Select
              name="p2"
              label="Player 2"
              ref={p2Ref}
              options={users}
            ></Select>
            <Select
              name="p3"
              label="Player 3"
              ref={p3Ref}
              options={users}
            ></Select>
            <Select
              name="p4"
              label="Player 4"
              ref={p4Ref}
              options={users}
            ></Select>
            <Button style={{ marginTop: '1rem' }} type="submit">Create Room</Button>
          </form>
      </Card>
      <Card className="form">
        <Button style={{ width: "100%" }} onClick={toggleSettings}>
          Options
        </Button>
      </Card>
    </>
  );
};

export default CreateRoom;
