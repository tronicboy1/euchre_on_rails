import { authActions } from "./auth-slice";
import { gameStateActions } from "./store";

export const sendAuthRequest = (address, username, password, token) => {
  return (dispatch) => {
    fetch(address, {
      method: "POST",
      credentials: "same-origin",
      headers: { "X-CSRF-Token": token },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((result) => result.json())
      .then((data) => {
        if (data.auth) {
          dispatch(authActions.setAuth(data));
          dispatch(authActions.setUsers(data.users));
          if (data.roomId) {
            dispatch(gameStateActions.setPlayerNo(data.playerNo));
            dispatch(authActions.setRoom(data));
          }
          console.log(data);
        } else {
          dispatch(authActions.setAuthErrors(true));
        }
      })
      .catch((e) => console.log(e));
  };
};

export const sendCreateRoomRequest = (playerList, token) => {
  return (dispatch) => {
    fetch("game/new/json", {
      method: "POST",
      credentials: "same-origin",
      headers: { "X-CSRF-Token": token },
      body: JSON.stringify(playerList),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(authActions.setRoom(data));
        dispatch(gameStateActions.setPlayerNo(data.playerNo));
      })
      .catch((e) => console.log(e));
  };
};

export const getGameUpdates = (address) => {
  return (dispatch) => {
    fetch(address)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(authActions.setGameUpdates(data.gameUpdates));
      })
      .catch((e) => console.log(e));
  };
};

const destroyRoom = (token, roomId) => {
  fetch("game/leave/json", {
    method: "POST",
    credentials: "same-origin",
    headers: { "X-CSRF-Token": token },
    body: JSON.stringify({ roomId }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((e) => console.log(e));
};

export const leaveRoom = (token, roomId) => {
  return (dispatch) => {
    destroyRoom(token,roomId);
    dispatch(authActions.leaveRoom())
  };
};

export const logoutUser = (token, roomId) => {
  return (dispatch) => {
    destroyRoom(token,roomId);
    dispatch(authActions.logout());
  };
};
