import React from "react";
import ReactDOM from "react-dom";

import styles from "./Modal.module.css";

const Modal = (props) => {
    return ReactDOM.createPortal(
        <div onClick={props.onClick} className={`${styles.overlay} ${props.fading && styles.fading}`}>
            <div onClick={(e) => {e.stopPropagation()}} className={styles.contents}>{props.children}</div>
        </div>, document.getElementById('modal')
    );
};

export default Modal;