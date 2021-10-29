import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendCreateRoomRequest } from "../../store/auth-actions";

import styles from "./NewRoomForm.module.css";

import Card from "../../components/UI/Card";
import Select from "../../components/UI/Select";
import Button from "../../components/UI/Button";

const NewRoomForm = ({ token, userId }) => {
  const dispatch = useDispatch();
  //selectors
  const users = useSelector((state) => state.auth.users);
  const createRoomErrors = useSelector((state) => state.auth.createRoomErrors);
  //state
  const [formError, setFormError] = useState(false);
  //refs
  const p2Ref = useRef("");
  const p3Ref = useRef("");
  const p4Ref = useRef("");

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
  return (
    <Card className="form">
      <h3 style={{ marginBottom: "1.5rem" }}>Start a new game</h3>
      {formError && <p>Looks like you selected the same user twice!</p>}
      {createRoomErrors && <p>You invited a user who is already in a room.</p>}
      <form className={styles.form} onSubmit={submitHandler}>
        <Select name="p2" label="Player 2" ref={p2Ref} options={users}></Select>
        <Select name="p3" label="Player 3" ref={p3Ref} options={users}></Select>
        <Select name="p4" label="Player 4" ref={p4Ref} options={users}></Select>
        <Button style={{ marginTop: "1rem" }} type="submit">
          Create Room
        </Button>
      </form>
    </Card>
  );
};

export default NewRoomForm;
