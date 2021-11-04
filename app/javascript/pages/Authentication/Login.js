import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./Authentication.module.css";

import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import { sendAuthRequest } from "../../store/auth-actions";

const Login = () => {
  const dispatch = useDispatch();
  const csrfToken = useSelector((state) => state.auth.csrfToken);
  const authErrors = useSelector(state => state.auth.authErrors);
  const usernameRef = useRef("");
  const passwordRef = useRef("");

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    return () => {
      setUsernameError(false);
      setPasswordError(false);
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    if (username && password) {
      dispatch(sendAuthRequest('/login', username, password, csrfToken));
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
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        {authErrors && <p>Login information is invalid.</p>}
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
    </>
  );
};

export default Login;
