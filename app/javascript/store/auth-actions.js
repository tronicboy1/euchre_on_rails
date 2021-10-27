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