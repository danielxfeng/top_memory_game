import { useState } from "react";
import Board from "./Board";
import Msg from "./Msg";
import styles from "./Main.module.css";

const instruction =
  "You can click each Pokémon only once. You will lose if you click the same Pokémon twice.";

const Main = ({ score, setScore }) => {
  const [msg, setMsg] = useState({
    type: "info",
    text: instruction,
  });

  return (
    <main className={styles.main}>
      <Msg msg={msg} setMsg={setMsg} />
      <Board setScore={setScore} setMsg={setMsg} />
    </main>
  );
};

export default Main;
