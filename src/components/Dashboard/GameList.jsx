import React, { useEffect, useState, useContext, useId } from "react";
import { useGames } from "../../hooks";
import { UserContext } from "../../App";
import { joinGame } from "../../utils";
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";


const GameList = ({ games, loading, error, userInGame }) => {
  const { user, setUser } = useContext(UserContext);

  function handleJoinClick(e, gameId) {
    if (!user) {
      return;
    }
    joinGame(user.socket, gameId);
  }
  return (
    <div>
      <h2>Available Games</h2>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Questions</TableCell>
            <TableCell>Players</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Join</TableCell>
          </TableRow>
        </TableHead>
        {loading ? (
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <p>Loading games...</p>
          </div>
        ) : error ? (
          <p>{error}</p>
        ) : games.length === 0 ? (
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <p>There are no available games. Be the first to create one!</p>
          </div>
        ) : (
          <TableBody>
            {games.map((game) => {
              const shouldButtonDisabled = !(user && !userInGame);
              return (
                <TableRow key={game.id}>
                  <TableCell>{game.name}</TableCell>
                  <TableCell>{game.question_count}</TableCell>
                  <TableCell>{game.player_count}</TableCell>
                  <TableCell>
                    <Chip label={game.state} />
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      disabled={shouldButtonDisabled}
                      onClick={(e) => handleJoinClick(e, game.id)}
                    >
                      Join Game
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default GameList;