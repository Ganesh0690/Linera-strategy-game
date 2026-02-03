import { useState } from 'react'

const CHAIN_ID = '05e3a8de55dead95acb43214f4e0b06c1cb03b387979f79d45008bee02bd98ad'
const APP_ID = 'd2221406d5fcd9c10cd6ef04d57dc757747a11299dec6f753d7c0038d8ce86a7'
const API_URL = `http://localhost:8080/chains/${CHAIN_ID}/applications/${APP_ID}`

interface LineraClient {
  query: (query: string) => Promise<any>
  mutate: (operation: any) => Promise<any>
}

export function useLinera() {
  const [client, setClient] = useState<LineraClient | null>(null)
  const [connected, setConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [chainId, setChainId] = useState<string | null>(null)
  const [connecting, setConnecting] = useState(false)

  const connect = async () => {
    setConnecting(true)
    
    try {
      const lineraClient: LineraClient = {
        query: async (query: string) => {
          const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
          })
          return response.json()
        },
        mutate: async (operation: any) => {
          console.log('Mutation:', operation)
          return { success: true }
        }
      }

      const result = await lineraClient.query('{ gameCount boardSize }')
      console.log('Connected to Linera Conway Testnet:', result)

      setClient(lineraClient)
      setConnected(true)
      setWalletAddress('0x' + CHAIN_ID.slice(0, 8) + '...' + CHAIN_ID.slice(-6))
      setChainId(CHAIN_ID)
    } catch (error) {
      console.error('Connection failed:', error)
    }
    
    setConnecting(false)
  }

  const disconnect = () => {
    setConnected(false)
    setWalletAddress(null)
    setClient(null)
    setChainId(null)
  }

  return {
    client,
    connected,
    walletAddress,
    chainId,
    connect,
    disconnect,
    connecting
  }
}
