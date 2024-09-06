import React, { useContext } from "react";
import { GameLobbyJoinedContext } from "../../App";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import ChessPiece from "../../assets/chess-piece-queen.png";
import Button from "@mui/material/Button";


function GameOverLeaderBoard({ scoresEndGame, setUserInGame }) {
  const { gameStarted, setGameStarted } = useContext(GameLobbyJoinedContext);

  let playersNotIncludingWinnerArray = scoresEndGame?.scores.slice(1);

  return (
    <>
      {scoresEndGame === null ? (
        <p> Loading...</p>
      ) : (
        <>
          <Typography sx={{ mt: 5 }} variant="h4">
            Leader Board
          </Typography>
          <Box sx={{ p: 5 }}>
            <Card
              sx={{
                width: "100%",
                width: "350px",
                borderColor: "#7986cb",
                boxShadow: `0 0 24px #c5cae9`,
                mb: 3,
                backgroundImage: `url(${ChessPiece})`,
                backgroundSize: "18%",
                backgroundRepeat: " no-repeat",
              }}
              variant="outlined"
            >
              <CardContent
                sx={{
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <Typography variant="body1">
                  {scoresEndGame.scores[0].name}
                </Typography>
                <Typography variant="body1">
                  {scoresEndGame.scores[0].score}
                </Typography>
              </CardContent>
            </Card>

            {playersNotIncludingWinnerArray.map((player) => (
              <Card
                key={playersNotIncludingWinnerArray.indexOf(player)}
                variant="outlined"
              >
                <CardContent
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <Typography variant="body1">{player.name}</Typography>
                  <Typography variant="body1">{player.score}</Typography>
                </CardContent>
              </Card>
            ))}
            <div
              style={{ display: "flex", padding: 2, justifyContent: "center" }}
            >
              <Button
                style={{ border: "solid, red, 1px", margin: 12 }}
                onClick={() => setUserInGame(false)}
                variant="outlined"
              >
                {/* this button does not work */}
                Leave
              </Button>
            </div>
          </Box>
        </>
      )}
    </>
  );
}

export default GameOverLeaderBoard;
