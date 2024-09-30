import { useState, useEffect } from "react";
import Board from "./Board";
import Msg from "./Msg";

const instruction =
  "You can click each Pokémon only once. You will lose if you click the same Pokémon twice.";

const Main = ({ score, setScore }) => {
  const [msg, setMsg] = useState({
    type: "info",
    text: instruction,
  });

  return (
    <main>
      <Msg msg={msg} />
      <Board score={score} setScore={setScore} setMsg={setMsg} />
    </main>
  );
};

export default Main;
