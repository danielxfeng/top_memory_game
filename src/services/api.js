// A constant that represents the maximum number of pokemons that can be fetched.
const Limit = 1010;

// This Api module is a factory function that returns an object with two methods:
// fetchFromApi: an async function that fetches the pokemon's name and image url from the pokeapi.co API.
//                 Cache mechanism is applied by using localStorage.
//                 Will return null when error or no data is fetched.
const Api = (id) => {
  
  const _url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const _id = id;
  const _expirationTime = 1000 * 60 * 60 * 24 * 30; // 30 days

  const fetchFromCache = () => {
    const data = localStorage.getItem(_id);
    if (!data) return null;
    const parsedData = JSON.parse(data);
    const isExpired = parsedData.timestamp + _expirationTime < Date.now();
    if (isExpired) {
      localStorage.removeItem(_id);
      return null;
    }
    return { id: _id, value: parsedData.value, imgUrl: parsedData.imgUrl };
  };

  const saveToCache = (id, value, imgUrl) => {
    try {
      const timestamp = Date.now();
      localStorage.setItem(id, JSON.stringify({ value, imgUrl, timestamp }));
    } catch (e) {
      console.error("error on writing to cache, ", e);
    }
  };

  const fetchFromApi = async () => {
    const cachedItem = fetchFromCache();
    if (cachedItem) {
      return cachedItem;
    }
    try {
      const response = await fetch(_url, { mode: "cors" });
      const json = await response.json();

      const name = json.name;

      const imgUrls = json.sprites;
      const imgUrl = Object.values(imgUrls).find(
        (value) => value && typeof value === "string" && value.endsWith("png")
      );
      if (!imgUrl) throw new Error("can not find image url");

      saveToCache(_id, name, imgUrl);
      return { id: _id, value: name, imgUrl: imgUrl };
    } catch (e) {
      console.error("error on fetching data, ", e);
      return null;
    }
  };

  return { fetchFromApi };
};

export { Limit, Api };
