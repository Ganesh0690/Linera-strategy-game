export type UnitType = 'king' | 'warrior' | 'archer' | 'mage'
export type Player = 'player' | 'ai'

export interface Position {
  x: number
  y: number
}

export interface Unit {
  id: number
  type: UnitType
  owner: Player
  position: Position
  health: number
  maxHealth: number
  attack: number
  range: number
  movement: number
  moved: boolean
  attacked: boolean
}

export interface GameState {
  units: Unit[]
  currentTurn: Player
  turnCount: number
  selectedUnit: Unit | null
  gameStatus: 'playing' | 'ended'
  winner: Player | null
}