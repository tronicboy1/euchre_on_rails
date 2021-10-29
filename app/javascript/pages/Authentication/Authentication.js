import React from "react";
import { Redirect, Switch, Route, useLocation } from "react-router-dom";

import styles from "./Authentication.module.css";

import Login from "./Login";
import Register from "./Register";
import Card from "../../components/UI/Card";
import LinkBar from "./LinkBar";

const Authentication = (props) => {
  const location = useLocation();
  const mode = location.pathname.split("/")[2];
  //redirect if logged in
  if (props.isAuth) {
    return <Redirect to="/game" />;
  }
  return (
    <>
      <div className={styles.banner}>
        <h1>
          <span className={styles.welcome}>Welcome,</span>
          <span className={styles.rails}> to Euchre on Rails.</span>
        </h1>
      </div>
      <Card
        style={{ height: mode === "login" ? "310px" : "390px", overflow: "hidden" }}
        className="form"
        className2="form-animation-delay"
      >
        <LinkBar />
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
