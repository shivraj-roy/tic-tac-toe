import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

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
   const [players, setPlayers] = useState({
      X: 'Player 1',
      Y: 'Player 2'
   })
   const [gameTurns, setGameTurns] = useState([]);
   // const [activePlayer, setActivePlayer] = useState("X");
   const activePlayer = deriveActivePlayer(gameTurns);
   let gameBoard = [...initialGameBoard.map((array)=>[...array])];

   for (const turn of gameTurns) {
      const { square, player } = turn;
      const { row, col } = square;
      gameBoard[row][col] = player;
   }

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

   const hasDraw = gameTurns.length === 9 && !winner;

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

   function restartHandler() {
      setGameTurns([]);
   }

   function changePlayerNameHandler(symbol, name) {
      setPlayers((prevPlayers) => {
         return {
            ...prevPlayers,
            [symbol]: name
         }});
   }

   return (
      <main>
         <div id="game-container">
            <ol id="players" className="highlight-player">
               <Player
                  initialName="Player 1"
                  symbol="X"
                  isActive={activePlayer === "X"}
                  onChangeName={changePlayerNameHandler}
               />
               <Player
                  initialName="Player 2"
                  symbol="O"
                  isActive={activePlayer === "O"}
                  onChangeName={changePlayerNameHandler}
               />
            </ol>
            {(winner || hasDraw) && <GameOver winner={winner} onRestart={restartHandler}/>}
            <GameBoard onSelectCell={selectCellHandler} board={gameBoard} />
         </div>
         <Log turns={gameTurns} />
      </main>
   );
}

export default App;
