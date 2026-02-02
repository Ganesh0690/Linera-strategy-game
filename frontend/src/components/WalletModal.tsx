interface WalletModalProps {
  onClose: () => void
  onConnect: () => void
  connecting: boolean
}

export function WalletModal({ onClose, onConnect, connecting }: WalletModalProps) {
  const wallets = [
    { id: 'dynamic', name: 'Dynamic', icon: '🔐', desc: 'Recommended for Linera' },
    { id: 'metamask', name: 'MetaMask', icon: '🦊', desc: 'Popular Web3 Wallet' },
    { id: 'checko', name: 'CheCko', icon: '✓', desc: 'Linera Native Wallet' },
  ]

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Connect Wallet</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="wallet-list">
          {wallets.map(wallet => (
            <button
              key={wallet.id}
              className="wallet-option"
              onClick={onConnect}
              disabled={connecting}
            >
              <span className="wallet-icon">{wallet.icon}</span>
              <div className="wallet-info">
                <span className="wallet-name">{wallet.name}</span>
                <span className="wallet-desc">{wallet.desc}</span>
              </div>
              {connecting && <span className="spinner">⟳</span>}
            </button>
          ))}
        </div>

        <div className="modal-footer">
          <div className="network-info">
            <span className="network-dot"></span>
            Linera Conway Testnet
          </div>
        </div>
      </div>
    </div>
  )
}