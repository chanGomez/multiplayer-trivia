import React, { useState, useContext } from "react";
import { UserContext, OpenConnectionContext } from "../../App";
import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import gif from "../../assets/tech-gif.gif";

export default function LandingPage({ fetchGames }) {
  const [name, setName] = useState("");
  const { user, setUser } = useContext(UserContext);
  const { isConnectionOpen, setIsConnectionOpen } = useContext(
    OpenConnectionContext
  );

  function handleOnchange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  async function handleOnClick(e) {
    e.preventDefault();
    // socket is establishing a connection between client and server
    let socket = new WebSocket(`ws://localhost:8080/connect?name=${name}`);

    //when the live server connect between client and sever us open
    socket.addEventListener("open", async (event) => {
      const createdUser = { name, socket };
      setUser(createdUser);
      setIsConnectionOpen(true);
      await fetchGames();
    });

    //connection closed
    socket.addEventListener("close", () => {
      setIsConnectionOpen(false);
    });
    setName("");
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: { xs: 10, sm: 10 },
        // pb: { xs: 8, sm: 12 },
      }}
    >
      <Stack spacing={2} useFlexGap sx={{ width: { xs: "100%", sm: "70%" } }}>
        <Typography variant="h5" textAlign="center" color="text.secondary">
          Test your knowledge on cap tables with friend.
          <br />
          Enter your name to play!
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignSelf="center"
          spacing={1}
          useFlexGap
          sx={{ pt: 2, width: { xs: "100%", sm: "auto" } }}
        >
          <TextField
            id="outlined-basic"
            hiddenLabel
            size="small"
            variant="outlined"
            aria-label="Enter your email address"
            placeholder="Enter your name"
            //   inputProps={{
            //     autoComplete: "off",
            //     ariaLabel: "Enter your email address",
            //   }}
            name="name"
            value={name}
            onChange={(e) => handleOnchange(e)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => handleOnClick(e)}
          >
            Join
          </Button>
        </Stack>
      </Stack>

      <Box
        id="image"
        sx={(theme) => ({
          // mt: { xs: 8, sm: 10 },
          alignSelf: "center",
          height: 500,
          width: "50%",
          backgroundImage: `url(${gif})`,
          backgroundSize: "100%",
          backgroundRepeat: " no-repeat",
          // borderRadius: "10px",
          // outline: "1px solid",
          outlineColor:
            theme.palette.mode === "light"
              ? alpha("#BFCCD9", 0.5)
              : alpha("#9CCCFC", 0.1),
          // boxShadow:
          //   theme.palette.mode === "light"
          //     ? `0 0 12px 8px ${alpha("#9CCCFC", 0.2)}`
          //     : `0 0 24px 12px ${alpha("#033363", 0.2)}`,
        })}
      />
    </Container>
  );
}
