import { Limit, Api } from "./api";

const Square = (id, value, imgUrl) => {
  return { id, value, imgUrl };
};

// The logic of the game.
const Game = (size) => {
  const _shuffle_times = 5;
  const _size = size;
  const _clicked = new Set();
  let _squares = [];

  // Initialize the squares by fetching data from api.
  // Will throw an error when there is something wrong.
  const init = async () => {
    _squares = [];
    _clicked.clear();
    const idList = new Set();

    // Generate random unique ids for each square
    while (idList.size < _size) {
      idList.add(Math.floor(Math.random() * Limit));
    }

    // Fetch data from api to fill the squares
    _squares = await Promise.all(
      [...idList].map(async (id) => {
        const api = Api(id);
        const data = await api.fetchFromApi(id);
        if (!data || data.id !== id)
          throw new Error("Cannot fetch pokemon from api.");
        return Square(id, data.value, data.imgUrl);
      })
    );
  };

  // Shuffle the squares.
  const shuffle = () => {
    for (let j = 0; j < _shuffle_times; j++) {
      const swapped = new Set();
      for (let i = 0; i < _size; i++) {
        if (swapped.has(i)) continue;
        let targetIdx = null;
        if (_size % 2 === 1 && i === Math.floor(_size / 2)) {
          targetIdx = Math.floor(Math.random() * _size);
        } else {
          // Not null, not same as i, and not swapped before.
          while (!targetIdx || i === targetIdx || swapped.has(targetIdx)) {
            targetIdx = Math.floor(Math.random() * _size);
          }
        }
        const temp = _squares[i];
        _squares[i] = _squares[targetIdx];
        _squares[targetIdx] = temp;
        swapped.add(i);
        swapped.add(targetIdx);
      }
    }
  };

  // Click the square with the given id.
  // Return:
  //  isOver: true if clicked a same id twice, false otherwise.
  //  score: the number of squares clicked.
  //  squares: null if isOver is true, otherwise return the sufferred squares.
  const click = (id) => {
    if (_clicked.has(id))
      return { isOver: true, score: _clicked.size, squares: null };
    _clicked.add(id);
    shuffle();
    return {
      isOver: _clicked.size === _size,
      score: _clicked.size,
    };
  };

  // Return the squares.
  const getSquares = () => _squares;

  return { init, click, getSquares };
};

export default Game;
