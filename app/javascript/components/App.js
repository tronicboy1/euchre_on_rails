import React, { useEffect } from "react";
import Game from "../pages/Game/Game";
import Authentication from "../pages/Authentication/Authentication";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "../store/store";
import { authActions } from "../store/auth-slice";

const App = (props) => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    const metas = document.getElementsByTagName("meta");
    for (let meta of metas) {
      if (meta.getAttribute("name") === "csrf-token") {
        dispatch(authActions.setCsrfToken(meta.getAttribute("content")));
      }
    }
  }, []);

  if (isAuth) {
    return <Game />;
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
