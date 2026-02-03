# ⚔️ Linera Tactics

Real-time turn-based strategy game with AI opponent built on Linera blockchain.

## 🚀 Deployed on Conway Testnet

- **Chain ID**: `05e3a8de55dead95acb43214f4e0b06c1cb03b387979f79d45008bee02bd98ad`
- **App ID**: `d2221406d5fcd9c10cd6ef04d57dc757747a11299dec6f753d7c0038d8ce86a7`
- **GraphQL**: `http://localhost:8080/chains/05e3a.../applications/d2221...`

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

## Tech Stack

- **Smart Contract**: Rust + Linera SDK 0.15
- **Frontend**: React + TypeScript + Vite
- **Blockchain**: Linera Conway Testnet

## Linera Features Used

- Microchains for game sessions
- Cross-chain messaging for matchmaking
- GraphQL service API
- Real-time state updates (~200ms)

## Run Locally
```bash
cd frontend
npm install
npm run dev
```

## Team

- Discord: [Your Discord]

## License

Apache-2.0
