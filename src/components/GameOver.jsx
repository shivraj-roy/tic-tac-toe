export default function GameOver({winner, onRestart}) {
  return (
    <div id="game-over">
      <h2>Game Over !</h2>
      <p>{winner ? `Winner is ${winner}` : "It's a draw !"}</p>
      <button onClick={onRestart}>REMATCH</button>
    </div>
  )
}