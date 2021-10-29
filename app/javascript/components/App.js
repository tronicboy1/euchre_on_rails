import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import store from "../store/store";
import { authActions } from "../store/auth-slice";

import Game from "../pages/Game/Game";
import Authentication from "../pages/Authentication/Authentication";
import CreateRoom from "../pages/CreateRoom/CreateRoom";
import Header from "../pages/Header";

const App = (props) => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const userId = useSelector((state) => state.auth.userId);
  const username = useSelector((state) => state.auth.username);
  const roomId = useSelector((state) => state.auth.roomId);
  const loggedOut = useSelector((state) => state.auth.loggedOut);

  //set token and check for local storage
  useEffect(() => {
    const metas = document.getElementsByTagName("meta");
    let token;
    for (let meta of metas) {
      if (meta.getAttribute("name") === "csrf-token") {
        token = meta.getAttribute("content");
        dispatch(authActions.setCsrfToken(token));
      }
    }
    const isAuth = window.localStorage.getItem("isAuth");
    if (isAuth) {
      const localId = Number(window.localStorage.getItem("userId"));
      const localUsername = window.localStorage.getItem("username");
      dispatch(
        authActions.setAuth({ userId: localId, username: localUsername })
      );
    }
  }, []);

  //set local storage on changes
  useEffect(() => {
    if (isAuth) {
      window.localStorage.setItem("isAuth", 1);
      window.localStorage.setItem("username", username);
      window.localStorage.setItem("userId", userId);
    }
    if (loggedOut) {
      window.localStorage.clear();
    }
  }, [userId, username, isAuth]);

  if (isAuth && roomId) {
    return <Game />;
  }

  return (
    <>
      <Header />
      <Switch>
        <Route path="/game">
          <CreateRoom isAuth={isAuth} />
        </Route>
        <Route path="/authentication" >
          <Authentication isAuth={isAuth} />
        </Route>
        <Route to="/">
          <Redirect to={isAuth ? "/game" : "/authentication/login"} />
        </Route>
      </Switch>
    </>
  );
};

const WrappedApp = (props) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
};

export default WrappedApp;
