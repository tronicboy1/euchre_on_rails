import React from "react";

import styles from "./Register.module.css";

import Card from "../../components/UI/Card";

const Register = (props) => {
  const changeMode = () => {
    props.setMode('LOGIN');
  };

  return <Card></Card>;
};

export default Register;
