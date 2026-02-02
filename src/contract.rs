#![cfg_attr(target_arch = "wasm32", no_main)]

use linera_sdk::{abi::WithContractAbi, Contract, ContractRuntime};
use strategy_game::{GameResponse, Operation, StrategyGameAbi, Game, GameStatus, Unit, UnitType, Player, Position};

pub struct StrategyGameContract {
    runtime: ContractRuntime<Self>,
}

linera_sdk::contract!(StrategyGameContract);

impl WithContractAbi for StrategyGameContract {
    type Abi = StrategyGameAbi;
}

impl Contract for StrategyGameContract {
    type Message = ();
    type InstantiationArgument = ();
    type Parameters = ();
    type EventValue = ();

    async fn load(runtime: ContractRuntime<Self>) -> Self {
        Self { runtime }
    }

    async fn instantiate(&mut self, _argument: Self::InstantiationArgument) {}

    async fn execute_operation(&mut self, operation: Self::Operation) -> GameResponse {
        match operation {
            Operation::CreateGame { player_name } => GameResponse {
                success: true,
                message: format!("Game created for {}", player_name),
                game_id: Some(1),
            },
            Operation::JoinGame { game_id, player_name } => GameResponse {
                success: true,
                message: format!("{} joined game {}", player_name, game_id),
                game_id: Some(game_id),
            },
            Operation::MakeMove { game_id, from, to } => GameResponse {
                success: true,
                message: format!("Moved from ({},{}) to ({},{})", from.x, from.y, to.x, to.y),
                game_id: Some(game_id),
            },
            Operation::Attack { game_id, attacker, target } => GameResponse {
                success: true,
                message: format!("Attack from ({},{}) to ({},{})", attacker.x, attacker.y, target.x, target.y),
                game_id: Some(game_id),
            },
            Operation::EndTurn { game_id } => GameResponse {
                success: true,
                message: "Turn ended".to_string(),
                game_id: Some(game_id),
            },
            Operation::RequestAiMove { game_id } => GameResponse {
                success: true,
                message: "AI moved".to_string(),
                game_id: Some(game_id),
            },
        }
    }

    async fn execute_message(&mut self, _message: Self::Message) {}

    async fn store(self) {}
}