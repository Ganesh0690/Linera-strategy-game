import { Player } from '../utils/types'

interface GameHeaderProps {
  walletAddress: string | null
  onConnectWallet: () => void
  turnCount: number
  currentTurn: Player
}

export function GameHeader({ walletAddress, onConnectWallet, turnCount, currentTurn }: GameHeaderProps) {
  return (
    <header className="game-header">
      <div className="header-left">
        <h1 className="logo">⚔️ Linera Tactics</h1>
        <span className="network-badge">Conway Testnet</span>
      </div>
      
      <div className="header-center">
        <div className="turn-info">
          <span className="turn-label">Turn {turnCount}</span>
          <span className={`current-player ${currentTurn}`}>
            {currentTurn === 'player' ? '🔵 Your Turn' : '🔴 AI Turn'}
          </span>
        </div>
      </div>

      <div className="header-right">
        {walletAddress ? (
          <div className="wallet-connected">
            <span className="wallet-dot"></span>
            <span>{walletAddress}</span>
          </div>
        ) : (
          <button className="btn-connect" onClick={onConnectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </header>
  )
}