import { useState, useCallback } from 'react'
import { GameBoard } from './components/GameBoard'
import { GameHeader } from './components/GameHeader'
import { GameSidebar } from './components/GameSidebar'
import { WalletModal } from './components/WalletModal'
import { GameOverModal } from './components/GameOverModal'
import { Unit, Position, GameState, Player } from './utils/types'

const initialUnits: Unit[] = [
  { id: 1, type: 'king', owner: 'player', position: { x: 0, y: 3 }, health: 100, maxHealth: 100, attack: 10, range: 1, movement: 2, moved: false, attacked: false },
  { id: 2, type: 'warrior', owner: 'player', position: { x: 1, y: 2 }, health: 80, maxHealth: 80, attack: 20, range: 1, movement: 3, moved: false, attacked: false },
  { id: 3, type: 'warrior', owner: 'player', position: { x: 1, y: 4 }, health: 80, maxHealth: 80, attack: 20, range: 1, movement: 3, moved: false, attacked: false },
  { id: 4, type: 'archer', owner: 'player', position: { x: 0, y: 1 }, health: 50, maxHealth: 50, attack: 25, range: 3, movement: 2, moved: false, attacked: false },
  { id: 5, type: 'archer', owner: 'player', position: { x: 0, y: 5 }, health: 50, maxHealth: 50, attack: 25, range: 3, movement: 2, moved: false, attacked: false },
  { id: 6, type: 'mage', owner: 'player', position: { x: 0, y: 0 }, health: 40, maxHealth: 40, attack: 35, range: 2, movement: 2, moved: false, attacked: false },
  { id: 7, type: 'king', owner: 'ai', position: { x: 7, y: 3 }, health: 100, maxHealth: 100, attack: 10, range: 1, movement: 2, moved: false, attacked: false },
  { id: 8, type: 'warrior', owner: 'ai', position: { x: 6, y: 2 }, health: 80, maxHealth: 80, attack: 20, range: 1, movement: 3, moved: false, attacked: false },
  { id: 9, type: 'warrior', owner: 'ai', position: { x: 6, y: 4 }, health: 80, maxHealth: 80, attack: 20, range: 1, movement: 3, moved: false, attacked: false },
  { id: 10, type: 'archer', owner: 'ai', position: { x: 7, y: 1 }, health: 50, maxHealth: 50, attack: 25, range: 3, movement: 2, moved: false, attacked: false },
  { id: 11, type: 'archer', owner: 'ai', position: { x: 7, y: 5 }, health: 50, maxHealth: 50, attack: 25, range: 3, movement: 2, moved: false, attacked: false },
  { id: 12, type: 'mage', owner: 'ai', position: { x: 7, y: 6 }, health: 40, maxHealth: 40, attack: 35, range: 2, movement: 2, moved: false, attacked: false },
]

export default function App() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [gameState, setGameState] = useState<GameState>({
    units: initialUnits,
    currentTurn: 'player',
    turnCount: 1,
    selectedUnit: null,
    gameStatus: 'playing',
    winner: null,
  })

  const handleConnect = useCallback(async () => {
    setConnecting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setWalletAddress('0xe74e...989d')
    setConnecting(false)
    setShowWalletModal(false)
  }, [])

  const handleSelectUnit = useCallback((unit: Unit | null) => {
    if (unit && unit.owner !== gameState.currentTurn) return
    if (unit && (unit.moved && unit.attacked)) return
    setGameState(prev => ({ ...prev, selectedUnit: unit }))
  }, [gameState.currentTurn])

  const handleMove = useCallback((to: Position) => {
    setGameState(prev => {
      if (!prev.selectedUnit) return prev
      const newUnits = prev.units.map(u => 
        u.id === prev.selectedUnit!.id 
          ? { ...u, position: to, moved: true }
          : u
      )
      return { ...prev, units: newUnits, selectedUnit: null }
    })
  }, [])

  const handleAttack = useCallback((targetId: number) => {
    setGameState(prev => {
      if (!prev.selectedUnit) return prev
      const attacker = prev.selectedUnit
      let newUnits = prev.units.map(u => {
        if (u.id === targetId) {
          const newHealth = Math.max(0, u.health - attacker.attack)
          return { ...u, health: newHealth }
        }
        if (u.id === attacker.id) {
          return { ...u, attacked: true }
        }
        return u
      }).filter(u => u.health > 0)

      const playerKing = newUnits.find(u => u.type === 'king' && u.owner === 'player')
      const aiKing = newUnits.find(u => u.type === 'king' && u.owner === 'ai')

      let gameStatus: GameState['gameStatus'] = 'playing'
      let winner: Player | null = null

      if (!playerKing) {
        gameStatus = 'ended'
        winner = 'ai'
      } else if (!aiKing) {
        gameStatus = 'ended'
        winner = 'player'
      }

      return { ...prev, units: newUnits, selectedUnit: null, gameStatus, winner }
    })
  }, [])

  const handleEndTurn = useCallback(() => {
    setGameState(prev => {
      const resetUnits = prev.units.map(u => ({ ...u, moved: false, attacked: false }))
      
      if (prev.currentTurn === 'player') {
        return { ...prev, units: resetUnits, currentTurn: 'ai' as Player, selectedUnit: null }
      }
      return { ...prev, units: resetUnits, currentTurn: 'player' as Player, turnCount: prev.turnCount + 1, selectedUnit: null }
    })

    if (gameState.currentTurn === 'player') {
      setTimeout(() => {
        executeAiTurn()
      }, 1000)
    }
  }, [gameState.currentTurn])

  const executeAiTurn = useCallback(() => {
    setGameState(prev => {
      const aiUnits = prev.units.filter(u => u.owner === 'ai')
      const playerUnits = prev.units.filter(u => u.owner === 'player')
      
      let newUnits = [...prev.units]
      
      aiUnits.forEach(aiUnit => {
        const nearestPlayer = playerUnits.reduce((nearest, pu) => {
          const dist = Math.abs(pu.position.x - aiUnit.position.x) + Math.abs(pu.position.y - aiUnit.position.y)
          const nearestDist = nearest ? Math.abs(nearest.position.x - aiUnit.position.x) + Math.abs(nearest.position.y - aiUnit.position.y) : Infinity
          return dist < nearestDist ? pu : nearest
        }, null as Unit | null)

        if (nearestPlayer) {
          const dist = Math.abs(nearestPlayer.position.x - aiUnit.position.x) + Math.abs(nearestPlayer.position.y - aiUnit.position.y)
          
          if (dist <= aiUnit.range) {
            newUnits = newUnits.map(u => {
              if (u.id === nearestPlayer.id) {
                return { ...u, health: Math.max(0, u.health - aiUnit.attack) }
              }
              return u
            }).filter(u => u.health > 0)
          } else {
            const dx = nearestPlayer.position.x > aiUnit.position.x ? 1 : nearestPlayer.position.x < aiUnit.position.x ? -1 : 0
            const dy = nearestPlayer.position.y > aiUnit.position.y ? 1 : nearestPlayer.position.y < aiUnit.position.y ? -1 : 0
            const newX = Math.max(0, Math.min(7, aiUnit.position.x + dx))
            const newY = Math.max(0, Math.min(7, aiUnit.position.y + dy))
            
            const occupied = newUnits.some(u => u.position.x === newX && u.position.y === newY)
            if (!occupied) {
              newUnits = newUnits.map(u => 
                u.id === aiUnit.id ? { ...u, position: { x: newX, y: newY } } : u
              )
            }
          }
        }
      })

      const playerKing = newUnits.find(u => u.type === 'king' && u.owner === 'player')
      const aiKing = newUnits.find(u => u.type === 'king' && u.owner === 'ai')

      let gameStatus: GameState['gameStatus'] = 'playing'
      let winner: Player | null = null

      if (!playerKing) {
        gameStatus = 'ended'
        winner = 'ai'
      } else if (!aiKing) {
        gameStatus = 'ended'
        winner = 'player'
      }

      const resetUnits = newUnits.map(u => ({ ...u, moved: false, attacked: false }))

      return { 
        ...prev, 
        units: resetUnits, 
        currentTurn: 'player', 
        turnCount: prev.turnCount + 1,
        gameStatus,
        winner,
      }
    })
  }, [])

  const handleRestart = useCallback(() => {
    setGameState({
      units: initialUnits.map(u => ({ ...u, health: u.maxHealth, moved: false, attacked: false })),
      currentTurn: 'player',
      turnCount: 1,
      selectedUnit: null,
      gameStatus: 'playing',
      winner: null,
    })
  }, [])

  return (
    <div className="app">
      <GameHeader 
        walletAddress={walletAddress}
        onConnectWallet={() => setShowWalletModal(true)}
        turnCount={gameState.turnCount}
        currentTurn={gameState.currentTurn}
      />
      
      <main className="game-container">
        <GameBoard 
          units={gameState.units}
          selectedUnit={gameState.selectedUnit}
          currentTurn={gameState.currentTurn}
          onSelectUnit={handleSelectUnit}
          onMove={handleMove}
          onAttack={handleAttack}
        />
        
        <GameSidebar 
          units={gameState.units}
          selectedUnit={gameState.selectedUnit}
          currentTurn={gameState.currentTurn}
          onEndTurn={handleEndTurn}
        />
      </main>

      {showWalletModal && (
        <WalletModal 
          onClose={() => setShowWalletModal(false)}
          onConnect={handleConnect}
          connecting={connecting}
        />
      )}

      {gameState.gameStatus === 'ended' && (
        <GameOverModal 
          winner={gameState.winner}
          onRestart={handleRestart}
        />
      )}
    </div>
  )
}