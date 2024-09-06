import React, { useState, useContext } from "react";
import { selectAnswer } from "../../utils";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import LinearWithValueLabel from "../../assets/LinearWithValueLabel";
import Button from "@mui/material/Button";
import { GameLobbyJoinedContext, UserContext } from "../../App";

function Questions({
  questionsData,
  user,
  gameStarted,
  gameCountDown,
  playerAnswer,
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 30,
        padding: 30,
        alignSelf: "center",
      }}
    >
      <Chip label={"1 / 10"} />
      <Card variant="outlined" disabled>
        <CardContent sx={{ width: 650, textAlign: "center" }}>
          <Typography>{questionsData.question}</Typography>
        </CardContent>
      </Card>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ width: "100%" }}
      >
        {questionsData.options.map((option) => (
          <Grid item xs={6}>
            <Card
              className="options"
              sx={{ cursor: "pointer" }}
              key={questionsData.options.indexOf(option)}
              variant="outlined"
              onClick={() =>
                selectAnswer(
                  user.socket,
                  gameStarted.id,
                  questionsData.options.indexOf(option),
                  questionsData.id
                )
              }
            >
              <Button sx={{ width: "100%", height: "100%" }}>
                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="body1">{option}</Typography>
                </CardContent>
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
      <LinearWithValueLabel playerAnswer={playerAnswer} />
    </div>
  );
}

export default Questions;
