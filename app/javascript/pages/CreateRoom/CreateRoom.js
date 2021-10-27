import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

import styles from "./CreateRoom.module.css";

import Card from "../../components/UI/Card";
import Select from "../../components/UI/Select";
import Button from "../../components/UI/Button";

const CreateRoom = () => {
  const username = useSelector((state) => state.auth.username);
  const userId = useSelector((state) => state.auth.userId);
  const users = useSelector((state) => state.auth.users);

  const [formError, setFormError] = useState(false);

  const p2Ref = useRef("");
  const p3Ref = useRef("");
  const p4Ref = useRef("");

  const submitHandler = (e) => {
    e.preventDefault();
    const p2IsValid = p2Ref.current.value === "computer" ? true : p2Ref.current.value !==
    if (isValid) {
      const playerList = {
        p1: userId,
        p2: p2Ref.current.value,
        p3: p3Ref.current.value,
        p4: p4Ref.current.value,
      };
      console.log(playerList);
    } else {
      setFormError(true);
    }
  };

  return (
    <>
      <Card className="form">
        <Card className="form-inner">
          <h1>Welcome back, {username}</h1>
        </Card>
      </Card>
      <Card className="form">Game Updates here</Card>
      <Card className="form">
        <Card className="form-inner">
          <h3>Start a new game</h3>
          {formError && <p>Looks like you selected the same user twice!</p>}
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
            <Button type="submit">Create Room</Button>
          </form>
        </Card>
      </Card>
    </>
  );
};

export default CreateRoom;
