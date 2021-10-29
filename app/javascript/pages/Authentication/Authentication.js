import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import {
  Redirect,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

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

  const loginButtonStyle = {
    borderTopLeftRadius: "8px",
    borderBottomLeftRadius: "8px",
  };
  const registerButtonStyle = {
    borderTopRightRadius: "8px",
    borderBottomRightRadius: "8px",
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
          <NavLink
            style={loginButtonStyle}
            activeClassName={styles.active}
            onClick={onLoginClick}
            to="/authentication/login"
          >
            Login
          </NavLink>
          <NavLink
            style={registerButtonStyle}
            activeClassName={styles.active}
            onClick={onRegisterClick}
            to="/authentication/register"
          >
            Register
          </NavLink>
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
