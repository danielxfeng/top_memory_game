import { useState, useEffect, useRef } from "react";
import styles from "./Header.module.css";
import { fetchHighest, saveHighest } from "../services/highest";

const Header = ({ score }) => {
  // Keep the highest score in the local state.
  const [highest, setHighest] = useState(() => fetchHighest() || 0);
  const refTitle = useRef(null);

  // Update the highest score when the current score is higher.
  useEffect(() => {
    if (score > highest) {
      setHighest(score);
      saveHighest(score);
    }
  }, [score, highest]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      refTitle.current.classList.add(styles.title__done);
    }, 100);

    return () => {
      clearTimeout(timeout);
    }
  }, []);

  return (
    <header className={styles.header}>
      <a href="/" className="a a-no-change">
        <h1 ref={refTitle} className={styles.title}>Fancy Memory Game</h1>
      </a>
      <div className={styles.score__container}>
        <p className={styles.score__item}>
          <span className={styles.score__label}>Score:</span>
          <span className={styles.score__value}>{score}</span>
        </p>
        <p className={styles.score__item}>
          <span className={styles.score__label}>Highest:</span>
          <span className={styles.score__value}>{highest}</span>
        </p>
      </div>
    </header>
  );
};

export default Header;
