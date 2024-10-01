import { useEffect, useRef } from "react";
import styles from "./Msg.module.css";

// Display a message for a short period of time.
const Msg = ({ msg, setMsg }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (msg.type === "none") return;
    const timer1 = setTimeout(() => {
      ref.current.classList.add(styles.msg__show);
    }, 500);
    const timer2 = setTimeout(() => {
      setMsg({ type: "none", text: "" });
    }, 8000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [msg, setMsg]);

  return !msg || msg.type === "none" ? null : (
    <div ref={ref} className={styles.msg}>
      <h2>{msg.type}</h2>
      <p>{msg.text}</p>
    </div>
  );
};

export default Msg;
