import React, { useEffect } from "react";
import Game from "../pages/Game/Game";
import Authentication from "../pages/Authentication/Authentication";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "../store/store";
import { authActions } from "../store/auth-slice";

const getCsrfToken = () => {
  const metas = document.getElementsByTagName("meta");
  for (let meta of metas) {
    if (meta.getAttribute("name") === "csrf-token") {
      return meta.getAttribute("content");
    }
  }
  return "";
};

const App = (props) => {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.isAuth);

  useEffect(() => {
    const metas = document.getElementsByTagName("meta");
    for (let meta of metas) {
      if (meta.getAttribute("name") === "csrf-token") {
        dispatch(authActions.setCsrfToken(meta.getAttribute("content")));
      }
    }
  }, []);

  //   const onHttpClick = () => {
  //     fetch("/login/json", {
  //       method: "POST",
  //       credentials: "same-origin",
  //       headers: { "X-CSRF-Token": getCsrfToken() },
  //       body: JSON.stringify({ key1: "test succeeded!" }),
  //     })
  //       .then((result) => result.json())
  //       .then((data) => {
  //         console.log(data);
  //       });
  //   };

  if (isAuth) {
    return (
      <Game
        roomId={props.roomId}
        userId={props.userId}
        username={props.username}
        playerNo={props.playerNo}
        playerNames={props.playerNames}
      />
    );
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
