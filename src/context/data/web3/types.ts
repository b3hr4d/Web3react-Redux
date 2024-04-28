import type { CoinbaseWallet } from "@web3-react/coinbase-wallet"
import type { Empty } from "@web3-react/empty"
import type { GnosisSafe } from "@web3-react/gnosis-safe"
import type { MetaMask } from "@web3-react/metamask"
import type { Network } from "@web3-react/network"
import { Connector } from "@web3-react/types"
import type {
  AbstractConnectorArguments,
  ConnectorUpdate,
} from "@web3-react/types6"
import type { Url } from "@web3-react/url"
import type { WalletConnect } from "@web3-react/walletconnect"
import type { EventEmitter } from "events"

export declare abstract class AbstractConnector extends EventEmitter {
  readonly supportedChainIds?: number[]
  constructor({ supportedChainIds }?: AbstractConnectorArguments)
  abstract activate(): Promise<ConnectorUpdate>
  abstract getProvider(): Promise<any>
  abstract getChainId(): Promise<number | string>
  abstract getAccount(): Promise<null | string>
  abstract deactivate(): void
  protected emitUpdate(update: ConnectorUpdate): void
  protected emitError(error: Error): void
  protected emitDeactivate(): void
}

export type ConnectorDetails = ConnectorDetail[]

export type ConnectorDetail = {
  name: ConnectorName
  icon: string
  connector: ConnectorType
}

export type ConnectorDetailFunction<T extends ConnectorName> = {
  name: T
  icon: string
  connector: Web3Connectors[T]
}

export type Web3Connectors = {
  url: Url
  empty: Empty
  network: Network
  metamask: MetaMask
  walletconnect: WalletConnect
  "gnosis-safe": GnosisSafe
  "coinbase-wallet": CoinbaseWallet
}

export type ConnectorName = keyof Web3Connectors

export type ConnectorArray = Partial<ConnectorName>[]

export type ConnectorType = Web3Connectors[ConnectorName] | Connector
