import React, { useContext, useState, useEffect } from "react";
import {
  UserContext,
  OpenConnectionContext,
  GameLobbyJoinedContext,
} from "../../App";
import { readyUp, startGame } from "../../utils";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Game from "./Game";
import GameOverLeaderBoard from "./GameOverLeaderBoard";
import Dashboard from "../Dashboard/Dashboard";

function GameLobby({
  playerList,
  playerReadyUp,
  isQuestionsInSession,
  gameEnded,
  questionsData,
  scoresEndGame,
  gameCountDown,
  userInGame,
  setUserInGame,
  playerAnswer
}) {
  const { user, setUser } = useContext(UserContext);
  const { gameStarted, setGameStarted } = useContext(GameLobbyJoinedContext);
  const [listOfReadyPlayers, setListOfReadyPlayers] = useState([]);
  const [allPlayersAreReady, setAllPlayersAreReady] = useState(false);

  useEffect(() => {
    function updateListOfPlayersReady() {
      setListOfReadyPlayers((prev) => {
        return [...prev, playerReadyUp?.player];
      });
    }
    updateListOfPlayersReady();
  }, [playerReadyUp]);

  function checkIsThisPlayerReady(playerName) {
    return listOfReadyPlayers.includes(playerName) ? "success" : "disabled";
  }

  function handleUserReadyUp() {
    readyUp(user.socket, gameStarted.id);
  }

  function handleStartGame() {
    startGame(user.socket, gameStarted.id);
  }

  return (
    <div
      style={{
        width: 750,
        height: 450,
        backgroundColor: "white",
        margin: 30,
        borderRadius: 15,
        border: "1px solid #ededed",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 10,
      }}
    >
      {/* gameStarted === user is in the game */}
      {/* isQuestionsInSession === the questionary has started */}

      {userInGame ? (
        isQuestionsInSession ? (
          gameEnded ? (
            <GameOverLeaderBoard
              scoresEndGame={scoresEndGame}
              setUserInGame={setUserInGame}
            />
          ) : (
            <Game
              questionsData={questionsData}
              gameCountDown={gameCountDown}
              playerAnswer={playerAnswer}
            />
          )
        ) : (
          <>
            <h2>{gameStarted?.payload.name}</h2>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {playerList.map((playerName) => {
                return (
                  <ListItem
                    key={crypto.randomUUID()}
                    secondaryAction={
                      <CheckCircleIcon
                        color={checkIsThisPlayerReady(playerName)}
                      />
                    }
                  >
                    <Avatar sx={{ bgcolor: "grey" }}>{playerName[0]}</Avatar>
                    <Typography
                      component="h5"
                      variant="h5"
                      sx={{ paddingLeft: 3 }}
                    >
                      {playerName}
                    </Typography>
                  </ListItem>
                );
              })}
            </List>

            <div style={{ display: "flex", padding: 20 }}>
              {user.name == playerList[0] ? (
                <>
                  <Button
                    style={{ border: "solid, red, 1px", margin: 12 }}
                    onClick={() => setUserInGame(false)}
                    variant="outlined"
                  >
                    {/* this button does not work */}
                    Leave
                  </Button>

                  <Button
                    style={{ border: "solid, red, 1px", margin: 12 }}
                    onClick={() => handleUserReadyUp()}
                    variant="outlined"
                  >
                    Ready Up
                  </Button>

                  <Button
                    style={{ border: "solid, red, 1px", margin: 12 }}
                    onClick={() => handleStartGame()}
                    variant="outlined"
                    color="success"
                  >
                    {/* //only available to first player */}
                    Start
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    style={{ border: "solid, red, 1px", margin: 12 }}
                    onClick={() => setUserInGame(false)}
                    variant="outlined"
                  >
                    {/* this button does not work */}
                    Leave
                  </Button>
                  <Button
                    style={{ border: "solid, red, 1px", margin: 12 }}
                    onClick={() => handleUserReadyUp()}
                    disabled={allPlayersAreReady}
                    variant="outlined"
                  >
                    Ready Up
                  </Button>
                </>
              )}
            </div>
          </>
        )
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

export default GameLobby;

//if player is not creator or at index 0
//display ready up button

//if player is creator and all players are not ready
//display ready up button and disabled start button

//if player is creator and all players are ready
//display ready up button and disabled start button
