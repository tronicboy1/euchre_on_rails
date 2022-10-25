import React from "react";

import styles from "./Image.module.css";

const Image = (props) => {
  const imageSrc = props.src;

  return <img className={`${styles.img} ${styles[props.className]}`} src={imageSrc} />;
};

export default Image;
