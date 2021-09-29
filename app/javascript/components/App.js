import React, { useEffect } from "react"

import Card from "./UI/Card"

const App = (props) => {
  
  return (
    <Card>
    <h1>Test {props.username}</h1>
    <p>{props.room_id}</p>
    <p>{props.user_id}</p>
    </Card>
  );
};

export default App;
