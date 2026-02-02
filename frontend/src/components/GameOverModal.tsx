import { Player } from '../utils/types'

interface GameOverModalProps {
  winner: Player | null
  onRestart: () => void
}

export function GameOverModal({ winner, onRestart }: GameOverModalProps) {
  return (
    <div className="modal-overlay">
      <div className="modal-content game-over">
        <div className="game-over-icon">
          {winner === 'player' ? '🏆' : '💀'}
        </div>
        <h2>{winner === 'player' ? 'Victory!' : 'Defeat'}</h2>
        <p>
          {winner === 'player' 
            ? 'Congratulations! You have defeated the AI!' 
            : 'The AI has captured your King. Better luck next time!'}
        </p>
        <button className="btn-restart" onClick={onRestart}>
          Play Again
        </button>
      </div>
    </div>
  )
}