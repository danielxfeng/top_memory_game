import { useEffect } from "react";
import styles from "./Msg.module.css";

// Display a message for a short period of time.
const Msg = ({ msg, setMsg }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setMsg({ type: "none", text: "" });
    }, 5000);

    return () => clearTimeout(timer);
  }, [msg, setMsg]);

  return !msg || msg.type === "none" ? null : (
    <div className={styles.msg}>
      <h2>{msg.type}</h2>
      <p>{msg.text}</p>
    </div>
  );
};

export default Msg;
