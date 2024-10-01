// Fetch the highest score from cache.
const fetchHighest = () => {
  const data = localStorage.getItem("highest");
  if (!data) return null;
  const parsedData = parseInt(data, 10);
  return isNaN(parsedData) ? null : parsedData;
};

// Save the highest score to cache.
const saveHighest = (value) => {
  try {
    localStorage.setItem("highest", value);
  } catch (e) {
    console.error("error on writing to cache, ", e);
  }
};

export { fetchHighest, saveHighest };
