import { useState, useEffect } from "react";
import Board from "./Board";
import Msg from "./Msg";

const Main = () => {
  return (
    <main>
      <Msg />
      <Board />
    </main>
  );
};

export default Main;
