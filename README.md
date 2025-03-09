# Tic-Tac-Toe

This is a simple Tic-Tac-Toe game built with React.

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/shivraj-roy/tic-tac-toe.git
   ```
2. Navigate to the project directory:
   ```sh
   cd tic-tac-toe
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```

### Running the Game

To start the development server, run:

```sh
npm run dev
```

Open your browser and go to `http://localhost:5173` to play the game.

## Project Structure

-  `src/components/GameBoard.jsx`: The main game board component.
-  `src/components/Log.jsx`: The component that logs the moves made by players.

## How to Play

-  The game is played on a 3x3 grid.
-  Two players take turns to mark a cell with their symbol (X or O).
-  The first player to get three of their symbols in a row (horizontally, vertically, or diagonally) wins the game.
-  If all cells are filled and no player has three in a row, the game is a draw.

## License

This project is licensed under the MIT License.
