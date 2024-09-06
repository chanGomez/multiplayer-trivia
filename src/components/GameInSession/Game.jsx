import React, { useContext, useEffect } from "react";
import { GameLobbyJoinedContext, UserContext } from "../../App";
import Questions from "./Questions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Game({ questionsData, gameCountDown, playerAnswer }) {
  const { gameStarted, setGameStarted } = useContext(GameLobbyJoinedContext);
  const { user, setUser } = useContext(UserContext);

  //have a user select a question and send through websocket
  return (
    <div>
      {questionsData === null ? (
        <h2>Loading Question... </h2>
      ) : (
        <>
          <Questions
            questionsData={questionsData}
            user={user}
            gameStarted={gameStarted}
            gameCountDown={gameCountDown}
            playerAnswer={playerAnswer}
          />
        </>
      )}
    </div>
  );
}

export default Game;
