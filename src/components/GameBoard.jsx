import React, { useState } from "react";



export default function GameBoard({onSelectCell, board}) {
   
   // const [gameBoard, setGameBoard] = useState(initialGameBoard);

   // function selectCellHandler(rowIndex, colIndex) {
   //    setGameBoard((prevGameBoard) => {
   //       // * Updating state immutably, because we are not allowed to mutate the state directly...
   //       const updatedBoard = [
   //          ...prevGameBoard.map((innerArray) => [...innerArray]),
   //       ]; // * Deep copy of the game board...
   //       updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
   //       return updatedBoard;
   //    });
   //    onSelectCell();
   // }
   return (
      <ol id="game-board">
         {board.map((row, rowIndex) => (
            <li key={rowIndex}>
               <ol>
                  {row.map((playerSymbol, cellIndex) => (
                     <li key={cellIndex}>
                        <button
                           onClick={() =>
                              onSelectCell(rowIndex, cellIndex)
                           }
                           disabled={playerSymbol !== null}
                        >
                           {playerSymbol}
                        </button>
                     </li>
                  ))}
               </ol>
            </li>
         ))}
      </ol>
   );
}
