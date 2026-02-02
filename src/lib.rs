use async_graphql::{Request, Response};
use linera_sdk::abi::{ContractAbi, ServiceAbi};
use serde::{Deserialize, Serialize};

pub struct StrategyGameAbi;

impl ContractAbi for StrategyGameAbi {
    type Operation = Operation;
    type Response = GameResponse;
}

impl ServiceAbi for StrategyGameAbi {
    type Query = Request;
    type QueryResponse = Response;
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub enum Operation {
    CreateGame { player_name: String },
    JoinGame { game_id: u64, player_name: String },
    MakeMove { game_id: u64, from: Position, to: Position },
    Attack { game_id: u64, attacker: Position, target: Position },
    EndTurn { game_id: u64 },
    RequestAiMove { game_id: u64 },
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct GameResponse {
    pub success: bool,
    pub message: String,
    pub game_id: Option<u64>,
}

#[derive(Debug, Deserialize, Serialize, Clone, Copy, PartialEq, Eq)]
pub struct Position {
    pub x: u8,
    pub y: u8,
}

#[derive(Debug, Deserialize, Serialize, Clone, Copy, PartialEq, Eq)]
pub enum UnitType {
    Warrior,
    Archer,
    Mage,
    King,
}

#[derive(Debug, Deserialize, Serialize, Clone, Copy, PartialEq, Eq)]
pub enum Player {
    Player1,
    Player2,
    Ai,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Unit {
    pub unit_type: UnitType,
    pub owner: Player,
    pub position: Position,
    pub health: u8,
    pub attack: u8,
    pub range: u8,
    pub movement: u8,
    pub moved: bool,
    pub attacked: bool,
}

#[derive(Debug, Deserialize, Serialize, Clone, PartialEq, Eq)]
pub enum GameStatus {
    WaitingForPlayer,
    InProgress,
    Player1Turn,
    Player2Turn,
    AiTurn,
    Player1Wins,
    Player2Wins,
    AiWins,
}

#[derive(Debug, Deserialize, Serialize, Clone)]
pub struct Game {
    pub id: u64,
    pub player1: String,
    pub player2: Option<String>,
    pub status: GameStatus,
    pub units: Vec<Unit>,
    pub board_size: u8,
    pub turn_count: u32,
    pub is_ai_game: bool,
    pub created_at: u64,
}