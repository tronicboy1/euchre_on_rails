import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";

import styles from "./Header.module.css";

import spade from "../../assets/images/spade.png";

const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);

  //functions
  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  return (
    <header className={styles.header}>
      <span className={`${styles.icon} ${!isAuth && styles.delay}`}>
        <img src={spade} alt="" /> Euchre on Rails
      </span>
      <nav className={`${styles.nav} ${!isAuth && styles.delay}`}>
        <ul>{isAuth && <li className={styles.selected} onClick={handleLogout}>Logout</li>}</ul>
      </nav>
    </header>
  );
};

export default Header;
