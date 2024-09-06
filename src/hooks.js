import { useState, useEffect, useCallback } from "react";
import { fetchGameList, leaderBoard } from "./Api/api";
import axios from "axios";

export function useGames() {
  //whichever component I call useGames in will get its OWN games, loading fetchGames,and error
  const [games, setGames] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGames = async () => {
    try {
      setIsLoading(true);
      const gameList = await fetchGameList();
      //set state with new values from server
      setGames(gameList);
      setIsLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError("Failed to fetch game list: " + error.message);
      } else {
        console.error(
          "An unknown error occurred while fetching the game list:",
          error
        );
        setError("An unknown error occurred. Please try again later.");
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return { games, fetchGames, loading, error };
}

export function useLeaderBoard() {
  const [leaderBoardList, setLeaderBoardList] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLeaderBoard = async () => {
    try {
      setIsLoading(true);
      const list = await leaderBoard();
      //set state with new values from server
      setLeaderBoardList(list);
      setIsLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError("Failed to fetch game list: " + error.message);
      } else {
        console.error(
          "An unknown error occurred while fetching the game list:",
          error
        );
        setError("An unknown error occurred. Please try again later.");
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderBoard();
  }, []);

  return { leaderBoardList, fetchLeaderBoard, loading, error };
}
