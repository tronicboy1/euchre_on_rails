import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "../store/store";
import { authActions } from "../store/auth-slice";

import Game from "../pages/Game/Game";
import Authentication from "../pages/Authentication/Authentication";
import CreateRoom from "../pages/CreateRoom/CreateRoom";

const App = (props) => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const roomId = useSelector((state) => state.auth.roomId);

  useEffect(() => {
    const metas = document.getElementsByTagName("meta");
    for (let meta of metas) {
      if (meta.getAttribute("name") === "csrf-token") {
        dispatch(authActions.setCsrfToken(meta.getAttribute("content")));
      }
    }
  }, []);

  if (isAuth && roomId) {
    return <Game />;
  }
  if (isAuth) {
    return <CreateRoom />;
  }
  return <Authentication />;
};

const WrappedApp = (props) => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default WrappedApp;
