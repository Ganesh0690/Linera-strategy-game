import { Unit, Player } from '../utils/types'

interface GameSidebarProps {
  units: Unit[]
  selectedUnit: Unit | null
  currentTurn: Player
  onEndTurn: () => void
}

export function GameSidebar({ units, selectedUnit, currentTurn, onEndTurn }: GameSidebarProps) {
  const playerUnits = units.filter(u => u.owner === 'player')
  const aiUnits = units.filter(u => u.owner === 'ai')

  const getUnitName = (type: string) => {
    const names: Record<string, string> = {
      king: 'King',
      warrior: 'Warrior',
      archer: 'Archer',
      mage: 'Mage',
    }
    return names[type] || type
  }

  return (
    <aside className="game-sidebar">
      <div className="sidebar-section">
        <h3>📊 Battle Stats</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">Your Units</span>
            <span className="stat-value player">{playerUnits.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Enemy Units</span>
            <span className="stat-value ai">{aiUnits.length}</span>
          </div>
        </div>
      </div>

      {selectedUnit && (
        <div className="sidebar-section unit-details">
          <h3>🎯 Selected Unit</h3>
          <div className="unit-card">
            <div className="unit-header">
              <span className="unit-name">{getUnitName(selectedUnit.type)}</span>
              <span className={`unit-owner ${selectedUnit.owner}`}>
                {selectedUnit.owner === 'player' ? 'Ally' : 'Enemy'}
              </span>
            </div>
            <div className="unit-stats">
              <div className="stat-row">
                <span>❤️ Health</span>
                <span>{selectedUnit.health}/{selectedUnit.maxHealth}</span>
              </div>
              <div className="stat-row">
                <span>⚔️ Attack</span>
                <span>{selectedUnit.attack}</span>
              </div>
              <div className="stat-row">
                <span>🎯 Range</span>
                <span>{selectedUnit.range}</span>
              </div>
              <div className="stat-row">
                <span>👟 Movement</span>
                <span>{selectedUnit.movement}</span>
              </div>
            </div>
            <div className="unit-status">
              {selectedUnit.moved && <span className="status moved">Moved</span>}
              {selectedUnit.attacked && <span className="status attacked">Attacked</span>}
              {!selectedUnit.moved && !selectedUnit.attacked && <span className="status ready">Ready</span>}
            </div>
          </div>
        </div>
      )}

      <div className="sidebar-section">
        <h3>📜 How to Play</h3>
        <ul className="instructions">
          <li>Click a unit to select it</li>
          <li>Blue tiles = valid moves</li>
          <li>Red tiles = valid attacks</li>
          <li>Capture the enemy King to win!</li>
        </ul>
      </div>

      <button 
        className="btn-end-turn" 
        onClick={onEndTurn}
        disabled={currentTurn !== 'player'}
      >
        {currentTurn === 'player' ? 'End Turn ➡️' : 'AI Thinking...'}
      </button>
    </aside>
  )
}