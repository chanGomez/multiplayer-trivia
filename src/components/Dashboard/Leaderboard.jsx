import React from 'react'
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#7986cb",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function LeaderBoard() {
  return (
    <Box sx={{ width: "100%", padding: 5 }}>
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="flex-end"
        spacing={{ lg: 9 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid xs={2} sm={4} md={4}>
          <Item sx={{ height: "100px" }}>2</Item>
        </Grid>
        <Grid xs={2} sm={4} md={4}>
          <Item sx={{ height: "182px" }}>1</Item>
        </Grid>
        <Grid xs={2} sm={4} md={4}>
          <Item sx={{ height: "60px" }}>3</Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default LeaderBoard;