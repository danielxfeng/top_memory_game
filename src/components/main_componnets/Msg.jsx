import { useEffect, useRef } from "react";
import styles from "./Msg.module.css";

// Display a message for a short period of time.
const Msg = ({ msg, setMsg }) => {
  const ref = useRef(null);

  const hide = (e) => {
    e.preventDefault();
    setMsg({ type: "none", text: "" });
  };

  useEffect(() => {
    if (msg.type === "none") return;
    const timer = setTimeout(() => {
      ref.current.classList.add(styles.msg__show);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [msg, setMsg]);

  return !msg || msg.type === "none" ? null : (
    <div ref={ref} className={styles.msg}>
      <button className={styles.btn__close} onClick={(e)=>hide(e)}>
        x
      </button>
      <h2>{msg.type}</h2>
      <p>{msg.text}</p>
    </div>
  );
};

export default Msg;
