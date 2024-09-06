1. Project Overview
I set out to develop a clean and user-friendly trivia game within a one-week timeframe. My goal was to implement all essential features while also incorporating additional functionalities that I decided were essential for the user experience. Key features included real-time updates for game creation, player readiness notifications, and instant alerts when a user answers a question.

2. Technical Decisions
Frontend Technology:
I selected React for its robust component-based architecture, which facilitated the development process. For styling, I utilized Material UI due to its high customizability and ease of use.

WebSocket Integration:
This was my first time using websocket and it was a great learning opportunity. I decided not to use existing WebSocket libraries, choosing instead to manage WebSocket connections manually. The application's state, including the user's name and socket connection, was provided throughout the app via React Context. I centralized event handling in the App.js file, where a switch case determined the actions based on received event messages. Handling everything in one place helped me keep organized and manage all incoming messages and multiple states. 

3. Strategic Decisions
Game Design: User Experience
The landing page was designed to be inviting, with a clear call to action prompting users to input their name. Upon connection, users are directed to a dashboard displaying their name, a list of current games, and an option to create a new game.

Game Flow
Once a user joins a game, they are placed in a game lobby. Only the game's creator can start the game, and all players must indicate they are ready before the game can begin. Player's ready states are shown by green check marks next to each player’s name. When the game starts and a player selects an answer, a toast notification is broadcast to all players showing whether the answer was correct or not. At the conclusion of the game, a leader board is displayed, with the winner featured at the top of the list.

4. Challenges and Solutions
The primary challenge was ensuring effective communication between the client and the WebSocket. Implementing a switch case on an open user socket proved to be a practical solution, allowing for clear and organized message handling. While I considered alternative approaches, I came to the conclusion that it was best for me and the game I had to create. 

5. Conclusion
This project was a valuable experience, I was able to gain hands-on knowledge of WebSockets and client-server communication. I plan to further refine this game with a focus on enhancing the user experience. Thank you for the opportunity!