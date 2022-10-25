import React from "react";
import Card from "../../../../../components/UI/Card";
import styles from "./Kitty.module.css";
import { useSelector } from "react-redux";

const Kitty = () => {
  const kitty = useSelector((state) => state.gameState.kitty);

  const imgData = kitty.b64Img;
  return (
    <Card className="kitty">
      <div className={styles.kitty}>
        <h3>Kitty</h3>
        {kitty.b64Img && <img src={imgData} />}
      </div>
    </Card>
  );
};

export default Kitty;
