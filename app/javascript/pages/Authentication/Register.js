import React, { useRef, useState } from "react";

import styles from "./Authentication.module.css";

import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { sendAuthRequest } from "../../store/auth-actions";

const Register = (props) => {
  const csrfToken = useSelector((state) => state.auth.csrfToken);
  const authErrors = useSelector((state) => state.auth.authErrors);
  const dispatch = useDispatch();
  const username = useRef("");
  const password = useRef("");
  const passwordCheck = useRef("");
  const [formValid, setFormValid] = useState({
    passwordIsValid: true,
    usernameIsValid: true,
  });

  const validator = (value) => {
    if (value.trim().length > 0) {
      const regex = /\W|_/g;
      return !regex.test(value);
    }
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const passwordIsValid =
      validator(password.current.value) &&
      passwordCheck.current.value === password.current.value;
    const usernameIsValid = validator(username.current.value);

    const isValid = usernameIsValid && passwordIsValid;
    if (isValid) {
      dispatch(
        sendAuthRequest(
          "/register",
          username.current.value,
          password.current.value,
          csrfToken
        )
      );
    } else {
      setFormValid({ passwordIsValid, usernameIsValid });
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        {authErrors && (
          <p>
            Something went wrong! Are you sure you are not already registered?
          </p>
        )}
        <Input
          className={!formValid.usernameIsValid && "invalid"}
          ref={username}
          type="username"
          name="username"
          label="Username"
        />
        <Input
          className={!formValid.passwordIsValid && "invalid"}
          ref={password}
          type="password"
          name="password"
          label="Password"
        />
        <Input
          className={!formValid.passwordIsValid && "invalid"}
          ref={passwordCheck}
          type="password"
          name="passwordCheck"
          label="Confirm password"
        />
        <Button type="submit">Register</Button>
      </form>
    </>
  );
};

export default Register;
