import React, { useRef } from "react";
import { useSelector } from "react-redux";
import Card from "../../components/UI/Card";
import Select from "../../components/UI/Select";

const CreateRoom = () => {
  const username = useSelector((state) => state.auth.username);
  const users = useSelector(state => state.auth.users);
  const selectRef = useRef('')
  console.log(users);

  const submitHandler = (e) => {
      e.preventDefault();
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
          <form onSubmit={submitHandler}>
              <Select ref={selectRef} options={users}></Select>
          </form>
        </Card>
      </Card>
    </>
  );
};

export default CreateRoom;
