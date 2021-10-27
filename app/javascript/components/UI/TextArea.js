import React from "react";

import styles from "./TextArea.module.css";

const TextArea = (props) => {
  return (
    <textarea
      className={`${styles.textarea} ${props.className}`}
      name={props.name}
      rows={props.rows}
      disabled={props.disabled}
      defaultValue={props.content}
    >
    </textarea>
  );
};

export default TextArea;
