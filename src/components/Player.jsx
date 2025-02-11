import React, { useState } from "react";

export default function Player({ initialName, symbol, isActive }) {
   const [playerName, setPlayerName] = useState(initialName); // This is used to store the player name...
   const [isEditing, setIsEditing] = useState(false);

   const changeHandler = (e) => {
      setPlayerName(e.target.value); // * This is used to update the player name...
   };

   const editHandler = () => {
      // setIsEditing(!isEditing); // * doesn't gurantee the latest state...
      setIsEditing((prevState) => !prevState); // * Gurantee the latest state, react ensures the latest state...
   };

   return (
      <li className={isActive ? "active" : undefined}>
         <span className="player">
            {!isEditing ? (
               <span className="player-name">{playerName}</span>
            ) : (
               <input
                  type="text"
                  value={playerName}
                  required
                  onChange={changeHandler}
               />
            )}
            <span className="player-symbol">{symbol}</span>
         </span>
         <button onClick={editHandler}>{isEditing ? "Save" : "Edit"}</button>
      </li>
   );
}
