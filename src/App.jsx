import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const initialGameBoard = [
   [null, null, null],
   [null, null, null],
   [null, null, null],
];

function deriveActivePlayer(gameTurns) {
   let currentPlayer = "X";
   if (gameTurns.length > 0 && gameTurns[0].player === "X") {
      currentPlayer = "O";
   }
   return currentPlayer;
}
function App() {
   const [gameTurns, setGameTurns] = useState([]);
   // const [activePlayer, setActivePlayer] = useState("X");
   const activePlayer = deriveActivePlayer(gameTurns);
   let gameBoard = initialGameBoard;

   for (const turn of gameTurns) {
      const { square, player } = turn;
      const { row, col } = square;
      gameBoard[row][col] = player;
   }

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
         console.log("Winner is ", firstCellSymbol);
      }
   }

   function selectCellHandler(rowIndex, colIndex) {
      // setActivePlayer((prevActivePlayer) =>
      //    prevActivePlayer === "X" ? "O" : "X"
      // );
      setGameTurns((prevTurns) => {
         const currentPlayer = deriveActivePlayer(prevTurns);
         const updatedTurns = [
            { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
            ...prevTurns,
         ];
         return updatedTurns;
      });
   }
   return (
      <main>
         <div id="game-container">
            <ol id="players" className="highlight-player">
               <Player
                  initialName="Player 1"
                  symbol="X"
                  isActive={activePlayer === "X"}
               />
               <Player
                  initialName="Player 2"
                  symbol="O"
                  isActive={activePlayer === "O"}
               />
            </ol>
            <GameBoard onSelectCell={selectCellHandler} board={gameBoard} />
         </div>
         <Log turns={gameTurns} />
      </main>
   );
}

export default App;
