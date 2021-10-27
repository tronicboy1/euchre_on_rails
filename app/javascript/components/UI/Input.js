import React from "react";

import styles from "./Input.module.css";

const Input = (props, ref) => {
  if (props.label) {
    return (
      <div>
        {props.label && (
          <label className={styles.label} htmlFor={props.name}>
            {props.label}
          </label>
        )}
        <input
          className={`${styles.input} ${styles[props.className]}`}
          type={props.type}
          name={props.name}
          ref={ref}
          id={props.name}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          onKeyPress={props.onKeyPress}
        />
      </div>
    );
  }
  return (
    <input
      className={`${styles.input} ${styles[props.className]}`}
      type={props.type}
      name={props.name}
      ref={ref}
      id={props.name}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      onKeyPress={props.onKeyPress}
    />
  );
};

export default React.forwardRef(Input);
