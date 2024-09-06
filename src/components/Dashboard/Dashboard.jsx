import React, { useContext } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import CreateGameForm from "./CreateGameForm";
import GameList from "./GameList";
import { UserContext } from "../../App";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";

export default function Dashboard({ fetchGames, games, loading, error }) {
  const { user, setUser } = useContext(UserContext);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CssBaseline />
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 0 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={4}>
            <Grid>
              <Paper
                variant="outlined"
                sx={{
                  mb: 3,
                  height: 60,
                  bgcolor: "white",
                  width: "100%",
                  borderRadius: 5,
                  display: "flex",
                  padding: 1,
                  paddingRight: 3,
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ bgcolor: "light grey" }}>{user.name[0]}</Avatar>
                <Typography component="h5" variant="h5" sx={{ paddingLeft: 3 }}>
                  {user.name}
                </Typography>
              </Paper>
            </Grid>
            <Grid>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  height: 155,
                  bgcolor: "white",
                  width: "100%",
                  borderRadius: 5,
                }}
              >
                <CreateGameForm fetchGames={fetchGames} />
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs={12} md={8} lg={8}>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
                bgcolor: "white",
                borderRadius: 5,
              }}
            >
              <GameList games={games} loading={loading} error={error} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
