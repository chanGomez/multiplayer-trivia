import Axios from "./Axios";

async function fetchGameList() {
  try {
    let result = await Axios.get(`/games`);
    return result.data;
  } catch (error) {
    return error;
  }
}

async function leaderBoard() {
  try {
    let result = await Axios.get(`/leaderboard`);
    return result.data;
  } catch (error) {
    return error;
  }
}

export { fetchGameList, leaderBoard };
