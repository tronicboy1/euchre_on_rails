import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { Redirect, Switch, Route, Link, useLocation } from "react-router-dom";

import styles from "./Authentication.module.css";

import Login from "./Login";
import Register from "./Register";
import Card from "../../components/UI/Card";

const Authentication = (props) => {
  //redirect if logged in
  if (props.isAuth) {
    return <Redirect to="/game" />;
  }
  const dispatch = useDispatch();
  const location = useLocation();
  const authState = location.pathname.split('/')[2];

  const loginButtonStyle = {
    background: authState === "login" && "rgb(192, 192, 192)",
    borderColor: authState === "login" && "rgb(77, 77, 77)",
    color: authState === "login" && "black",
    cursor: authState === "login" && "default",
    borderTopLeftRadius: "8px",
    borderBottomLeftRadius: "8px"
    
  };
  const registerButtonStyle = {
    background: authState === "register" && "rgb(192, 192, 192)",
    borderColor: authState === "register" && "rgb(77, 77, 77)",
    color: authState === "register" && "black",
    cursor: authState === "register" && "default",
    borderTopRightRadius: "8px",
    borderBottomRightRadius: "8px"
  };

  const onLoginClick = () => {
    dispatch(authActions.resetAuthErrors());
  };
  const onRegisterClick = () => {
    dispatch(authActions.resetAuthErrors());
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
          <div className={styles["button-bar"]}>
            <Link style={loginButtonStyle} onClick={onLoginClick} to="/authentication/login">Login</Link>
            <Link style={registerButtonStyle} onClick={onRegisterClick} to="/authentication/register">Register</Link>
          </div>
          <Switch>
            <Route path="/authentication/login">
              <Login />
            </Route>
            <Route path="/authentication/register">
              <Register />
            </Route>
            <Route path="/">
              <Redirect to="/authentication/login" />
            </Route>
          </Switch>
      </Card>
    </>
  );
};

export default Authentication;
