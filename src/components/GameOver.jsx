export default function GameOver({winner}) {
  return (
    <div id="game-over">
      <h2>Game Over !</h2>
      <p>{winner ? `Winner is ${winner}` : "It's a draw !"}</p>
      <button>REMATCH</button>
    </div>
  )
}