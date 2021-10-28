import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";

import styles from "./Header.module.css";

import spade from "../../assets/images/spade.png";

const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const authState = useSelector((state) => state.auth.authState);
  //states

  //functions
  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  const setToLogin = () => {
    dispatch(authActions.setAuthState("LOGIN"));
  };

  const setToRegister = () => {
    dispatch(authActions.setAuthState("REGISTER"));
  };

  return (
    <header className={styles.header}>
      <span className={styles.icon}>
        <img src={spade} alt="" /> Euchre on Rails
      </span>
      <nav className={styles.nav}>
        <ul>
          {isAuth && <li onClick={handleLogout}>Logout</li>}
          {!isAuth && (
            <>
              <li
                onClick={setToLogin}
                className={authState === "LOGIN" ? styles.selected : ""}
              >
                Login
              </li>
              <li
                onClick={setToRegister}
                className={authState === "REGISTER" ? styles.selected : ""}
              >
                Register
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
