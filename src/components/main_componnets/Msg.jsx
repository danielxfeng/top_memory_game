import { useState, useEffect } from "react";
import styles from "./Msg.module.css";

const Msg = ({ type, content }) => {
  return (
    <div className={styles.msg}>
      <h2>{type}</h2>
      <p>{content}</p>
    </div>
  );
};

export default Msg;
