# ⚔️ Linera Tactics

Real-time turn-based strategy game with AI opponent built on Linera blockchain.

## 🚀 Deployed on Conway Testnet

- **Chain ID**: `05e3a8de55dead95acb43214f4e0b06c1cb03b387979f79d45008bee02bd98ad`
- **App ID**: `d2221406d5fcd9c10cd6ef04d57dc757747a11299dec6f753d7c0038d8ce86a7`

## Live Demo

- **Frontend**: https://linera-strategy-game.vercel.app/
- **GraphQL API**: Run `linera service --port 8080` then open:
```
  http://localhost:8080/chains/05e3a8de55dead95acb43214f4e0b06c1cb03b387979f79d45008bee02bd98ad/applications/d2221406d5fcd9c10cd6ef04d57dc757747a11299dec6f753d7c0038d8ce86a7
```

## Features

- **Turn-Based Combat**: Strategic gameplay with movement and attack phases
- **AI Opponent**: Smart AI that responds to your moves in real-time
- **Microchain Architecture**: Each game session on its own microchain
- **Wallet Integration**: Connect via Dynamic, MetaMask, or CheCko

## Units

| Unit | Health | Attack | Range | Movement |
|------|--------|--------|-------|----------|
| King 👑 | 100 | 10 | 1 | 2 |
| Warrior ⚔️ | 80 | 20 | 1 | 3 |
| Archer 🏹 | 50 | 25 | 3 | 2 |
| Mage 🔮 | 40 | 35 | 2 | 2 |

## How to Play

1. Click a unit to select it
2. Blue tiles show valid moves
3. Red tiles show valid attacks
4. Capture the enemy King to win!

## Linera SDK Features Used

- **linera-sdk 0.15**: Smart contract development
- **async-graphql**: GraphQL service API
- **Microchains**: Each game session spawns its own chain
- **Cross-chain messaging**: For matchmaking support
- **Real-time updates**: ~200ms block finality

## Tech Stack

- **Smart Contract**: Rust + Linera SDK
- **Frontend**: React + TypeScript + Vite
- **Blockchain**: Linera Conway Testnet

## Run Locally
```bash
# Frontend
cd frontend
npm install
npm run dev

# Deploy Contract (requires linera CLI)
cargo build --release --target wasm32-unknown-unknown
linera publish-and-create \
  target/wasm32-unknown-unknown/release/strategy_game_contract.wasm \
  target/wasm32-unknown-unknown/release/strategy_game_service.wasm
```

## Team

- **Discord**: cryptofav
- **Wallet**: 0x87ECEbbE008c66eE0a45b4F2051Fe8e17f9afc1D

## Changelog

### Wave 6 (Feb 2026)
- Initial submission
- Deployed smart contract on Conway Testnet
- Turn-based strategy game with AI opponent
- React frontend with wallet connection
- GraphQL API for game state queries

## License

Apache-2.0