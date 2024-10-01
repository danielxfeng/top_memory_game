import { useState, useEffect, useRef } from "react";
import Game from "../../services/game";
import styles from "./Board.module.css";

const size = 12;

// The game board.
const Board = ({ setScore, setMsg }) => {
  // The references to the Game Over screen.
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  // Manage the game instance.
  const [game, setGame] = useState(null);
  // The game over flag.
  const [isOver, setIsOver] = useState(false);

  // Load the pokemons only once.
  useEffect(() => {
    const initGame = async () => {
      const game = Game(size);
      try {
        await game.init();
      } catch (e) {
        setMsg({
          type: "error",
          text: "Cannot fetch Pokémon data from the API, reload the page to retry.",
        });
        return;
      }
      setGame(game);
    };

    initGame();
  }, []);

  // Add the done class to the Game Over screen.
  useEffect(() => {
    if (!isOver) return;
    const timeout = setTimeout(() => {
      leftRef.current.classList.add(styles.result__done);
      rightRef.current.classList.add(styles.result__done);
    }, 500);

    return () => {
      clearTimeout(timeout);
    }
  }, [isOver]);

  // Perform a click event.
  const performClick = (e) => {
    e.preventDefault();
    if (!game) return;

    const id = e.currentTarget.getAttribute("data-key");
    const result = game.click(id);
    setScore(result.score); // Update the score.
    if (result.isOver) setIsOver(true); // Game over.
  };

  // The loading screen when fetching data.
  if (!game) return <div className={styles.loading}>Loading...</div>;

  // The game over screen.
  if (isOver) {

    return (
      <div className={styles.result}>
        <h2>
          <span ref={leftRef} className={styles.result__left}>Game</span>
          <span ref={rightRef} className={styles.result__right}>Over</span>
        </h2>
        <button
          className={styles.btn__restart}
          onClick={() => window.location.reload()}
        >
          Restart
        </button>
      </div>
    );
  }

  // The game board.
  return (
    <div className={styles.board}>
      {game.getSquares().map((square) => (
        <div
          className={styles.square}
          key={square.id}
          data-key={square.id}
          onClick={(e) => performClick(e)}
        >
          <div className={styles.square__content}>
            <img
              className={styles.square__img}
              src={square.imgUrl}
              alt={square.value}
            />
            <p className={styles.square__value}>{square.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Board;
