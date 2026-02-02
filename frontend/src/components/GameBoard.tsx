import { Unit, Position, Player } from '../utils/types'

interface GameBoardProps {
  units: Unit[]
  selectedUnit: Unit | null
  currentTurn: Player
  onSelectUnit: (unit: Unit | null) => void
  onMove: (to: Position) => void
  onAttack: (targetId: number) => void
}

export function GameBoard({ units, selectedUnit, currentTurn, onSelectUnit, onMove, onAttack }: GameBoardProps) {
  const getValidMoves = (unit: Unit): Position[] => {
    if (unit.moved) return []
    const moves: Position[] = []
    for (let dx = -unit.movement; dx <= unit.movement; dx++) {
      for (let dy = -unit.movement; dy <= unit.movement; dy++) {
        if (Math.abs(dx) + Math.abs(dy) <= unit.movement && (dx !== 0 || dy !== 0)) {
          const newX = unit.position.x + dx
          const newY = unit.position.y + dy
          if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
            const occupied = units.some(u => u.position.x === newX && u.position.y === newY)
            if (!occupied) {
              moves.push({ x: newX, y: newY })
            }
          }
        }
      }
    }
    return moves
  }

  const getValidAttacks = (unit: Unit): Unit[] => {
    if (unit.attacked) return []
    return units.filter(u => {
      if (u.owner === unit.owner) return false
      const dist = Math.abs(u.position.x - unit.position.x) + Math.abs(u.position.y - unit.position.y)
      return dist <= unit.range
    })
  }

  const validMoves = selectedUnit ? getValidMoves(selectedUnit) : []
  const validAttacks = selectedUnit ? getValidAttacks(selectedUnit) : []

  const handleCellClick = (x: number, y: number) => {
    const unitOnCell = units.find(u => u.position.x === x && u.position.y === y)
    
    if (selectedUnit) {
      if (unitOnCell) {
        if (unitOnCell.owner !== currentTurn && validAttacks.some(a => a.id === unitOnCell.id)) {
          onAttack(unitOnCell.id)
        } else if (unitOnCell.owner === currentTurn) {
          onSelectUnit(unitOnCell)
        } else {
          onSelectUnit(null)
        }
      } else if (validMoves.some(m => m.x === x && m.y === y)) {
        onMove({ x, y })
      } else {
        onSelectUnit(null)
      }
    } else {
      if (unitOnCell && unitOnCell.owner === currentTurn) {
        onSelectUnit(unitOnCell)
      }
    }
  }

  const getUnitEmoji = (unit: Unit) => {
    const emojis = {
      king: unit.owner === 'player' ? '👑' : '🤴',
      warrior: unit.owner === 'player' ? '⚔️' : '🗡️',
      archer: unit.owner === 'player' ? '🏹' : '🎯',
      mage: unit.owner === 'player' ? '🔮' : '✨',
    }
    return emojis[unit.type]
  }

  return (
    <div className="game-board">
      <div className="board-grid">
        {Array.from({ length: 8 }, (_, y) => (
          Array.from({ length: 8 }, (_, x) => {
            const unit = units.find(u => u.position.x === x && u.position.y === y)
            const isSelected = selectedUnit?.position.x === x && selectedUnit?.position.y === y
            const isValidMove = validMoves.some(m => m.x === x && m.y === y)
            const isValidAttack = validAttacks.some(a => a.position.x === x && a.position.y === y)
            const isDark = (x + y) % 2 === 1

            return (
              <div
                key={`${x}-${y}`}
                className={`cell ${isDark ? 'dark' : 'light'} ${isSelected ? 'selected' : ''} ${isValidMove ? 'valid-move' : ''} ${isValidAttack ? 'valid-attack' : ''}`}
                onClick={() => handleCellClick(x, y)}
              >
                {unit && (
                  <div className={`unit ${unit.owner}`}>
                    <span className="unit-emoji">{getUnitEmoji(unit)}</span>
                    <div className="health-bar">
                      <div 
                        className="health-fill" 
                        style={{ width: `${(unit.health / unit.maxHealth) * 100}%` }}
                      />
                    </div>
                    {unit.moved && <span className="status-icon moved">●</span>}
                    {unit.attacked && <span className="status-icon attacked">✕</span>}
                  </div>
                )}
              </div>
            )
          })
        ))}
      </div>
    </div>
  )
}