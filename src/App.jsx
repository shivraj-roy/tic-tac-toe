import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

const PLAYERS = {
   X: "Player 1",
   O: "Player 2",
};

const INTIAL_GAME_BOARD = [
   [null, null, null],
   [null, null, null],
   [null, null, null],
];

function deriveWinner(gameBoard, players) {
   let winner = null;

   for (const combinations of WINNING_COMBINATIONS) {
      const firstCellSymbol =
         gameBoard[combinations[0].row][combinations[0].column];
      const secondCellSymbol =
         gameBoard[combinations[1].row][combinations[1].column];
      const thirdCellSymbol =
         gameBoard[combinations[2].row][combinations[2].column];

      if (
         firstCellSymbol &&
         firstCellSymbol === secondCellSymbol &&
         firstCellSymbol === thirdCellSymbol
      ) {
         winner = players[firstCellSymbol];
      }
   }
   return winner;
}

function deriveActivePlayer(gameTurns) {
   let currentPlayer = "X";
   if (gameTurns.length > 0 && gameTurns[0].player === "X") {
      currentPlayer = "O";
   }
   return currentPlayer;
}

function deriveGameBoard(gameTurns) {
   let gameBoard = [...INTIAL_GAME_BOARD.map((array) => [...array])];

   for (const turn of gameTurns) {
      const { square, player } = turn;
      const { row, col } = square;
      gameBoard[row][col] = player;
   }
   return gameBoard;
}

function App() {
   const [players, setPlayers] = useState(PLAYERS);
   const [gameTurns, setGameTurns] = useState([]);

   const activePlayer = deriveActivePlayer(gameTurns);

   const gameBoard = deriveGameBoard(gameTurns);

   const winner = deriveWinner(gameBoard, players);

   const hasDraw = gameTurns.length === 9 && !winner;

   function selectCellHandler(rowIndex, colIndex) {
      setGameTurns((prevTurns) => {
         const currentPlayer = deriveActivePlayer(prevTurns);
         const updatedTurns = [
            { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
            ...prevTurns,
         ];
         return updatedTurns;
      });
   }

   function restartHandler() {
      setGameTurns([]);
   }

   function changePlayerNameHandler(symbol, name) {
      setPlayers((prevPlayers) => {
         return {
            ...prevPlayers,
            [symbol]: name,
         };
      });
   }

   return (
      <main>
         <div id="game-container">
            <ol id="players" className="highlight-player">
               <Player
                  initialName={PLAYERS.X}
                  symbol="X"
                  isActive={activePlayer === "X"}
                  onChangeName={changePlayerNameHandler}
               />
               <Player
                  initialName={PLAYERS.O}
                  symbol="O"
                  isActive={activePlayer === "O"}
                  onChangeName={changePlayerNameHandler}
               />
            </ol>
            {(winner || hasDraw) && (
               <GameOver winner={winner} onRestart={restartHandler} />
            )}
            <GameBoard onSelectCell={selectCellHandler} board={gameBoard} />
         </div>
         <Log turns={gameTurns} />
      </main>
   );
}

export default App;
