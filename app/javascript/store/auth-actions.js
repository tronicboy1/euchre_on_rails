import { authActions } from "./auth-slice";
import { gameStateActions } from "./store";

const baseUrl = `${window.location.protocol}//${window.location.host}/api`;

export const sendAuthRequest = (address, username, password, token) => {
  return (dispatch) => {
    fetch(`${baseUrl}${address}`, {
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
        } else {
          dispatch(authActions.setAuthErrors(true));
        }
      })
      .catch((e) => console.log(e));
  };
};

export const sendCreateRoomRequest = (playerList, token) => {
  return (dispatch) => {
    fetch(`${baseUrl}/game/new`, {
      method: "POST",
      credentials: "same-origin",
      headers: { "X-CSRF-Token": token },
      body: JSON.stringify(playerList),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.roomId) {
          dispatch(authActions.setRoom(data));
          dispatch(gameStateActions.setPlayerNo(data.playerNo));
        } else {
          dispatch(authActions.setCreateRoomErrors(true));
          dispatch(authActions.setUsers(data.users));
        }
      })
      .catch((e) => console.log(e));
  };
};

export const getGameUpdates = (address) => {
  return (dispatch) => {
    fetch(`${baseUrl}/game-updates`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(authActions.setGameUpdates(data.gameUpdates));
      })
      .catch((e) => console.log(e));
  };
};

const destroyRoom = (token, roomId) => {
  fetch(`${baseUrl}/game/leave`, {
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
    destroyRoom(token, roomId);
    dispatch(authActions.leaveRoom());
    dispatch(gameStateActions.resetGameState());
  };
};

export const logoutUser = (token, roomId) => {
  return (dispatch) => {
    destroyRoom(token, roomId);
    dispatch(authActions.logout());
    dispatch(gameStateActions.resetGameState());
  };
};

export const checkInvites = (token, userId) => {
  return (dispatch) => {
    fetch(`${baseUrl}/game/invites`, {
      method: "POST",
      credentials: "same-origin",
      headers: { "X-CSRF-Token": token },
      body: JSON.stringify({ userId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.roomId) {
          dispatch(authActions.setRoom(data));
          dispatch(gameStateActions.setPlayerNo(data.playerNo));
        } else {
          dispatch(authActions.setUsers(data.users));
        }
      })
      .catch((e) => console.log(e));
  };
};
