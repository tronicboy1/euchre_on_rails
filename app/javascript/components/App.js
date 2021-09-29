import React, { useContext, useEffect } from "react";
import ActionCableContext from "./Helpers/ActionCableContext";
import ActionCableProvider from "./Helpers/ActionCableProvider";

import Card from "./UI/Card";

const App = (props) => {
  const context = useContext(ActionCableContext);
  return (
    <ActionCableProvider
      roomId={props.roomId}
      userId={props.userId}
      username={props.username}
    >
      <Card>
        <h1>Test {context.username}</h1>
        <p>{props.roomId}</p>
        <p>{props.userId}</p>
      </Card>
    </ActionCableProvider>
  );
};

export default App;
