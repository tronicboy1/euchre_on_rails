import React from "react";

import styles from "./Input.module.css";

const Input = (props) => {
  return (
    <input
      className={`${styles.input} ${styles[props.className]}`}
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      onKeyPress={props.onKeyPress}
    />
  );
};

export default Input;
