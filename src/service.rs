#![cfg_attr(target_arch = "wasm32", no_main)]

use async_graphql::{EmptySubscription, Object, Schema, Request, Response};
use linera_sdk::{abi::WithServiceAbi, Service, ServiceRuntime};
use strategy_game::StrategyGameAbi;

pub struct StrategyGameService {
    _runtime: ServiceRuntime<Self>,
}

linera_sdk::service!(StrategyGameService);

impl WithServiceAbi for StrategyGameService {
    type Abi = StrategyGameAbi;
}

impl Service for StrategyGameService {
    type Parameters = ();

    async fn new(runtime: ServiceRuntime<Self>) -> Self {
        Self { _runtime: runtime }
    }

    async fn handle_query(&self, request: Request) -> Response {
        let schema = Schema::build(QueryRoot, MutationRoot, EmptySubscription).finish();
        schema.execute(request).await
    }
}

struct QueryRoot;

#[Object]
impl QueryRoot {
    async fn game_count(&self) -> u32 {
        1
    }

    async fn active_games(&self) -> u32 {
        1
    }

    async fn board_size(&self) -> u8 {
        8
    }
}

struct MutationRoot;

#[Object]
impl MutationRoot {
    async fn create_game(&self, player_name: String) -> String {
        format!("Game created for {}", player_name)
    }
}