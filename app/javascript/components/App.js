import React, { useEffect, useState } from "react";
import Game from "../pages/Game/Game";

const App = (props) => {
  const [json, setJson] = useState("nothing");
  useEffect(() => {}, []);
  return (
    <>
      <p>{json}</p>
      <Game
        roomId={props.roomId}
        userId={props.userId}
        username={props.username}
        playerNo={props.playerNo}
        playerNames={props.playerNames}
      />
    </>
  );
};

export default App;
