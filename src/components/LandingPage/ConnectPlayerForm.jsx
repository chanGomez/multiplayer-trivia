import React, { useState, useContext } from "react";
import { UserContext, OpenConnectionContext } from "../../App";

function ConnectPlayerForm({fetchGames}) {
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
    <form autocomplete="off">
      <h2>Connect to the server</h2>
      <div>
        <label htmlFor="name">
          Name
          <input
            type="text"
            className="border-solid border-4 border-gray-600"
            name="name"
            value={name}
            onChange={(e) => handleOnchange(e)}
          />
        </label>
        <button type="submit" onClick={(e) => handleOnClick(e)}>
          Connect
        </button>
      </div>
    </form>
  );
}

export default ConnectPlayerForm;
