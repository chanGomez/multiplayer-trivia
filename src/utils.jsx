export function generateNonce(length = 16) {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let nonce = "";

  // Use crypto.getRandomValues for cryptographically secure randomness
  const randomValues = new Uint8Array(length);
  crypto.getRandomValues(randomValues);

  for (let i = 0; i < length; i++) {
    nonce += charset[randomValues[i] % charset.length];
  }

  return nonce;
}
//--------------------- Player Commands -------------------
//lets  player create a new game
export function createGame(
  socket,
  name,
  questionCount
) {
  const payload = {
    name,
    question_count: questionCount,
  };
  const message = makePlayerCommand(payload, "create");
  socket.send(JSON.stringify(message));
}

//lets player join a game
export function joinGame(socket, gameId) {
  const payload = {
    game_id: gameId,
  };
  const message = makePlayerCommand(payload, "join");
  socket.send(JSON.stringify(message));
}

export function readyUp(socket, gameId) {
  const payload = {
    game_id: gameId,
  };
  const message = makePlayerCommand(payload, "ready");
  socket.send(JSON.stringify(message));
}

export function startGame(socket, gameId) {
  const payload = {
    game_id: gameId,
  };
  const message = makePlayerCommand(payload, "start");
  socket.send(JSON.stringify(message));
}

export function selectAnswer(socket, gameId, questionIndex, questionId) {
  const payload = {
    game_id: gameId,
    index: questionIndex,
    question_id: questionId,
  };
  const message = makePlayerCommand(payload, "answer");
  socket.send(JSON.stringify(message));
}

//helper function to create function layout
function makePlayerCommand(payload, type) {
  return { nonce: generateNonce(), payload, type };
}