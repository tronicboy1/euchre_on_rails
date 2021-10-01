import React, { useContext } from "react";

import Card from "../../UI/Card";

import styles from "./Kitty.module.css";
import ActionCableContext from "../../Helpers/ActionCableContext";

const Kitty = () => {
  const context = useContext(ActionCableContext);

  const imgData = "data:image/png;base64," + context.gameState.kitty.b64Img;
  return (
    <Card className="kitty">
      <div className={styles.kitty}>
          <h3>Kitty</h3>
        <img src={imgData} />
      </div>
    </Card>
  );
};

export default Kitty;
