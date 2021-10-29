import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";

import styles from "./Authentication.module.css";

import Login from "./Login";
import Register from "./Register";
import Card from "../../components/UI/Card";
import LinkBar from "./LinkBar";

const Authentication = (props) => {
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
      <Card className="form" className2="form-animation-delay">
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
