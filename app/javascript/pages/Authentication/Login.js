import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";

import styles from "./Login.module.css";

import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import { gameStateActions } from "../../store/store";

const Login = () => {
  const dispatch = useDispatch();
  const csrfToken = useSelector((state) => state.auth.csrfToken);
  const usernameRef = useRef("");
  const passwordRef = useRef("");

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [invalidCred, setInvalidCred] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    if (username && password) {
      fetch("/login/json", {
        method: "POST",
        credentials: "same-origin",
        headers: { "X-CSRF-Token": csrfToken },
        body: JSON.stringify({
          username: usernameRef.current.value,
          password: passwordRef.current.value,
        }),
      })
        .then((result) => result.json())
        .then((data) => {
          if (data.auth) {
            dispatch(authActions.setAuth(data));
            if (data.roomId) {
              dispatch(gameStateActions.setPlayerNo(data.playerNo));
            }
            console.log(data);
          } else {
            setInvalidCred(true);
          }
        })
        .catch((e) => console.log(e));
    } else {
      if (!username) {
        setUsernameError(true);
      }
      if (!password) {
        setPasswordError(true);
      }
    }
  };

  return (
    <Card className="form">
      <form className={styles.form} onSubmit={handleSubmit}>
        {invalidCred && <p>Login information is invalid.</p>}
        <Input
          className={usernameError && "invalid"}
          ref={usernameRef}
          type="username"
          name="username"
          label="Username"
        />
        <Input
          className={passwordError && "invalid"}
          ref={passwordRef}
          type="password"
          name="password"
          label="Password"
        />
        <Button type="submit">Login</Button>
      </form>
    </Card>
  );
};

export default Login;
