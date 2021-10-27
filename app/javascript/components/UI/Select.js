import React from "react";

import styles from "./Select.module.css";

const Select = (props, ref) => {
  const options = props.options.map((option) => (
    <option key={option[1]} value={option[1]}>
      {option[0]}
    </option>
  ));
  return (
    <div className={styles.box}>
      <label htmlFor={props.name}>{props.label}</label>
      <select name={props.name} ref={ref}>
        {options}
      </select>
    </div>
  );
};

export default React.forwardRef(Select);
