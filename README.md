# ⚔️ Linera Tactics

Real-time turn-based strategy game with AI opponent built on Linera blockchain.

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