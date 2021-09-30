import React, { useContext } from "react";
import ActionCableContext from "../../Helpers/ActionCableContext";

import styles from "./PickupPass.module.css";

const PickupPass = (props) => {
    const context = useContext(ActionCableContext);

    const onPass = () => {};

    const onPickup = () => {};

    return (
        <></>
    );
};

export default PickupPass;