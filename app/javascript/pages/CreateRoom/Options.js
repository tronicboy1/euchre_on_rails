import React from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";

import Modal from "../../components/UI/Modal";
import Button from "../../components/UI/Button";

const Options = (props) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
      dispatch(authActions.logout());
  };
  return (
    <Modal
      onClick={props.hide}
      fading={props.fading}
    >
      <Button onClick={handleLogout}>Logout</Button>
    </Modal>
  );
};

export default Options;
