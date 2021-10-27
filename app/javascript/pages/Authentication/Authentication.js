import React, { useState } from "react";
import Card from "../../components/UI/Card";

import styles from "./Authentication.module.css";

import Login from "./Login";
import Register from "./Register";

const Authentication = (props) => {
  const [mode, setMode] = useState("LOGIN");
  return (
    <>
      <Card className="form">
        <Card className="form-inner">
          <h1 className={styles.header}>Welcome to Euchre on Rails!</h1>
        </Card>
      </Card>
      <Card className="form">
        <Card className="form-inner">
          {mode === "LOGIN" ? (
            <Login setMode={setMode} />
          ) : (
            <Register setMode={setMode} />
          )}
        </Card>
      </Card>
    </>
  );
};

export default Authentication;
