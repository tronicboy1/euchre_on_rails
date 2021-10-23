import React from "react";
import ActionCableProvider from "./Helpers/ActionCableProvider";
import { Provider } from "react-redux";
import store from "../store/store";
import WrappedApp from "./WrappedApp";

const App = (props) => {
  return (
    <Provider store={store}>
      <ActionCableProvider
        roomId={props.roomId}
        userId={props.userId}
        username={props.username}
        playerNo={props.playerNo}
        playerNames={props.playerNames}
      >
        <WrappedApp />
      </ActionCableProvider>
    </Provider>
  );
};

export default App;
