import React, { useState, useContext, createContext, useEffect } from "react";
import "./App.css";
import GameLobby from "./components/GameInSession/GameLobby";
import Game from "./components/GameInSession/Game";
import { useGames } from "./hooks";
import { useLeaderBoard } from "./hooks";
export const UserContext = createContext({});
export const OpenConnectionContext = createContext({});
export const GameLobbyJoinedContext = createContext({});

//MUI theme
import getTheme from "./getTheme";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LandingPage from "./components/LandingPage/LandingPage";
import Box from "@mui/material/Box";
import Dashboard from "./components/Dashboard/Dashboard";
import Typography from "@mui/material/Typography";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [user, setUser] = useState(null);
  const [isConnectionOpen, setIsConnectionOpen] = useState(false);
  const [gameStarted, setGameStarted] = useState(null);
  const [playerList, setPlayerList] = useState([]);
  const [userInGame, setUserInGame] = useState(false);
  const [isQuestionsInSession, setIsQuestionsInSession] = useState(false);
  const [questionsData, setQuestionsData] = useState(null);
  const [playerReadyUp, setPlayerReadyUp] = useState(null);
  const [gameEnded, setGameEnded] = useState(false);
  const [gameCountDown, setGameCountDown] = useState(false);
  const [scoresEndGame, setScoresEndGame] = useState(null);
  const [playerAnswer, setPlayerAnswer] = useState(null);
  const { games, fetchGames, loading, error } = useGames();
  const { leaderBoardList, fetchLeaderBoard } = useLeaderBoard();
  const theme = createTheme(getTheme("light"));

  //provide user to entire app and the ability to alter the user or the game
  useEffect(() => {
    async function handleConnection() {
      if (user && user.socket) {
        user.socket.rem;
        user.socket.addEventListener("message", async (mes) => {
          const messageData = JSON.parse(mes.data);
          // console.log(messageData.type, messageData);
          switch (messageData.type) {
            //meaning a game has been created
            case "game_player_enter":
              setUserInGame(true);
              await fetchGames();
              setPlayerList(messageData?.payload?.players);
              setGameStarted(messageData);
              return;
            case "game_create":
              await fetchGames();
              return;
            case "game_player_join":
              setPlayerList((prev) => {
                return [...prev, messageData?.payload?.player];
              });
              await fetchGames();
              return;
            case "game_player_leave":
              return;
            case "game_player_ready":
              //show a ui that allows players to see others are ready
              setPlayerReadyUp(messageData?.payload);
              return;
            case "game_start":
              setIsQuestionsInSession(true);
              return;
            case "game_countdown":
              setGameCountDown(messageData?.payload);
              return;
            case "game_question":
              setQuestionsData(messageData?.payload);
              return;
            case "game_state_change":
              return;
            case "game_player_correct":
              setPlayerAnswer(messageData);
              return;
            case "game_player_incorrect":
              setPlayerAnswer(messageData);

              return;
            case "game_end":
              setGameEnded(true);
              setScoresEndGame(messageData?.payload);
              return;
            case "game_destroy":
              setIsQuestionsInSession(false);
              setGameEnded(true);
              return;
            default:
              return;
          }
        });
        return () => {
          user.socket.close();
        };
      }
    }
    handleConnection();
  }, [user])


//Toast effect when a user answers a question
  useEffect(() => {
    if (playerAnswer !== null && playerAnswer.type == "game_player_correct") {
      const notifyCorrect = (player) =>
        toast.success(`${player?.player} answered correct!`, {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      notifyCorrect(playerAnswer.payload);
    } else if (
      playerAnswer !== null &&
      playerAnswer.type == "game_player_incorrect"
    ) {
      const notifyWrong = (player) =>
        toast.error(`${player?.player} answered wrong!`, {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

      notifyWrong(playerAnswer.payload);
    }
  }, [playerAnswer]);



  return (
    <ThemeProvider theme={theme}>
      <OpenConnectionContext.Provider
        value={{ isConnectionOpen, setIsConnectionOpen }}
      >
        <Box
          id="background"
          sx={{
            width: "100%",
            height: "100vh",
            backgroundImage: "linear-gradient(#c5cae9, transparent)",
            backgroundSize: "100% 50%",
            backgroundRepeat: "no-repeat",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ToastContainer
            position="bottom-center"
            autoClose={2000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
            theme="light"
          />
          <Typography
            component="h1"
            variant="h1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignSelf: "center",
              textAlign: "center",
              pt: 10,
            }}
          >
            <Typography
              component="span"
              variant="h1"
              sx={{
                color: (theme) =>
                  theme.palette.mode === "light"
                    ? "primary.main"
                    : "primary.light",
              }}
            >
              Captrivia
            </Typography>
          </Typography>

          <UserContext.Provider value={{ user, setUser }}>
            <GameLobbyJoinedContext.Provider
              value={{ gameStarted, setGameStarted }}
            >
              <>
                {user ? (
                  userInGame ? (
                    <GameLobby
                      playerList={playerList}
                      playerReadyUp={playerReadyUp}
                      gameEnded={gameEnded}
                      isQuestionsInSession={isQuestionsInSession}
                      questionsData={questionsData}
                      scoresEndGame={scoresEndGame}
                      gameCountDown={gameCountDown}
                      userInGame={userInGame}
                      setUserInGame={setUserInGame}
                      playerAnswer={playerAnswer}
                    />
                  ) : (
                    <Dashboard
                      fetchGames={fetchGames}
                      games={games}
                      loading={loading}
                      error={error}
                    />
                  )
                ) : (
                  <LandingPage fetchGames={fetchGames} />
                )}
              </>
            </GameLobbyJoinedContext.Provider>
          </UserContext.Provider>
        </Box>
      </OpenConnectionContext.Provider>
    </ThemeProvider>
  );
}

export default App;
