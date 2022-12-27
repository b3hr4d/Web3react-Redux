import { ConnectorArray, Web3Connectors } from "./context/data/web3/types"

export const NEEDED_CONNECTORS: ConnectorArray = [
  "MetaMask",
  "WalletConnect",
  "CoinbaseWallet",
  "Network",
]

const connectors: Web3Connectors = NEEDED_CONNECTORS.reduce(
  (acc, key) => ({
    ...acc,
    [key]: require(`./context/data/web3/connectors/${key.toLowerCase()}`)
      .default,
  }),
  {} as Web3Connectors
)

export default connectors
