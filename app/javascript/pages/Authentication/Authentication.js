import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";

import styles from "./Authentication.module.css";

import Login from "./Login";
import Register from "./Register";
import Card from "../../components/UI/Card";
import Button from "../../components/UI/Button";

const Authentication = (props) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth.authState);

  const loginButtonStyle = {
    background: authState === "LOGIN" && "rgb(77, 77, 77)",
    borderColor: authState === "LOGIN" && "rgb(77, 77, 77)",
  };
  const registerButtonStyle = {
    background: authState === "REGISTER" && "rgb(77, 77, 77)",
    borderColor: authState === "REGISTER" && "rgb(77, 77, 77)",
  };

  const onLoginClick = () => {
    dispatch(authActions.setAuthState("LOGIN"));
  };
  const onRegisterClick = () => {
    dispatch(authActions.setAuthState("REGISTER"));
  };

  return (
    <>
      <div className={styles.banner}>
        <h1>
          <span className={styles.welcome}>Welcome,</span>
          <span className={styles.rails}> to Euchre on Rails.</span>
        </h1>
      </div>
      <Card className="form" className2="form-animation-delay">
        <Card className="form-inner">
          <div className={styles["button-bar"]}>
            <Button
              style={loginButtonStyle}
              onClick={onLoginClick}
              className="bar-left"
            >
              Login
            </Button>
            <Button
              style={registerButtonStyle}
              onClick={onRegisterClick}
              className="bar-right"
            >
              Register
            </Button>
          </div>
          {authState === "LOGIN" ? <Login /> : <Register />}
        </Card>
      </Card>
    </>
  );
};

export default Authentication;
