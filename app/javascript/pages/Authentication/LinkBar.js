import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useRouteMatch } from "react-router-dom";
import { authActions } from "../../store/auth-slice";

import styles from "./LinkBar.module.css";

const LinkBar = () => {
  const dispatch = useDispatch();
  const match  = useRouteMatch();

  const loginButtonStyle = {
    borderTopLeftRadius: "8px",
    borderBottomLeftRadius: "8px",
  };
  const registerButtonStyle = {
    borderTopRightRadius: "8px",
    borderBottomRightRadius: "8px",
  };

  const onLoginClick = () => {
    dispatch(authActions.resetAuthErrors());
  };
  const onRegisterClick = () => {
    dispatch(authActions.resetAuthErrors());
  };
  return (
    <div className={styles["button-bar"]}>
      <NavLink
        style={loginButtonStyle}
        activeClassName={styles.active}
        onClick={onLoginClick}
        to={`${match.path}/login`}
      >
        Login
      </NavLink>
      <NavLink
        style={registerButtonStyle}
        activeClassName={styles.active}
        onClick={onRegisterClick}
        to={`${match.path}/register`}
      >
        Register
      </NavLink>
    </div>
  );
};

export default LinkBar;
