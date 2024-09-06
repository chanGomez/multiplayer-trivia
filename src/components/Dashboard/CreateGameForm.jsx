import React, { useContext, useState } from "react";
import { UserContext, OpenConnectionContext } from "../../App";
import { createGame } from "../../utils";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function CreateGameForm({ fetchGames }) {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState("");
  const [questionCount, setQuestionCount] = useState("");

  async function handleCreateClick(e) {
    if (!user) {
      alert("Make sure you log in!");
      return;
    }
    const numberQuestionCount = Number(questionCount);
    createGame(user.socket, name, Math.min(numberQuestionCount, 10));
    setName("");
    setQuestionCount("");
  }

  return (
    <Box
      sx={{
        margin: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        Create Game
      </Typography>
      <TextField
        name="gameName"
        required
        id="gameName"
        label="Game Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ width: "100%" }}
        variant="outlined"
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          pt: 1,
        }}
      >
        <TextField
          name="questionCount"
          required
          id="firstName"
          label="Question Count 1-10"
          value={questionCount}
          onChange={(e) => setQuestionCount(e.target.value)}
          sx={{ pr: 1, width: "100%" }}
          variant="outlined"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => handleCreateClick(e)}
        >
          Create
        </Button>
      </Box>
    </Box>
  );
}

export default CreateGameForm;

// <Container component="main" maxWidth="xs" id="contact">
//   <CssBaseline />
//   <Box
//     sx={{
//       marginTop: 8,
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//     }}
//   >
//     <Typography component="h1" variant="h4">
//       Contact Me
//     </Typography>
//     <ToastContainer
//       position="top-right"
//       autoClose={5000}
//       hideProgressBar={false}
//       newestOnTop={false}
//       closeOnClick
//       rtl={false}
//       pauseOnFocusLoss
//       draggable
//       pauseOnHover
//       theme="dark"
//     />
//     <Box
//       component="form"
//       ref={form}
//       noValidate
//       onSubmit={sendEmail}
//       sx={{ mt: 3, mb: 8 }}
//     >
//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={6} className="contact_items">
//           <TextField
//             autoComplete="given-name"
//             name="firstName"
//             required
//             id="firstName"
//             label="First Name"
//             // autoFocus
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             required
//             id="lastName"
//             label="Last Name"
//             name="lastName"
//             autoComplete="family-name"
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             required
//             fullWidth
//             id="email"
//             label="Email Address"
//             name="email"
//             autoComplete="email"
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             required
//             id="message"
//             label="Message"
//             name="message"
//             multiline
//             rows={4}
//             fullWidth
//           />
//         </Grid>
//       </Grid>
//       <div style={{ display: "flex", justifyContent: "center" }}>
//         <button class="button-46" role="button">
//           SEND
//         </button>
//       </div>
//     </Box>
//   </Box>
// </Container>;
