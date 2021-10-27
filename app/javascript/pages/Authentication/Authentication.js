import React, { useState } from "react";

import Login from "./Login";
import Register from "./Register";

const Authentication = (props) => {
  const [mode, setMode] = useState("LOGIN");
  return mode === "LOGIN" ? (
    <Login setMode={setMode} />
  ) : (
    <Register setMode={setMode} />
  );
};

export default Authentication;
