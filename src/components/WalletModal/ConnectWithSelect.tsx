import { Network } from "@web3-react/network"
import { WalletConnect } from "@web3-react/walletconnect"
import { useCallback } from "react"
import {
  CHAINS,
  getAddChainParameters,
  URLS,
} from "../../context/data/web3/chains"
import { ConnectorDetail } from "../../context/data/web3/types"
import {
  ChainIdType,
  IsActivatingType,
  IsActiveType,
} from "../../context/hooks/useWeb3"
import useChainSwitch from "../../hooks/useChainSwitch"
import ChainSelect from "./ChainSelect"

interface ConnectWithSelectProps {
  connector: ConnectorDetail
  chainId: ChainIdType
  isActivating: IsActivatingType
  isActive: IsActiveType
  error: Error | undefined
  setError: (error: Error | undefined) => void
}

const ConnectWithSelect: React.FC<ConnectWithSelectProps> = ({
  connector,
  isActivating,
  isActive,
  error,
  setError,
}) => {
  const isNetwork = connector instanceof Network
  const displayDefault = !isNetwork
  const chainIds = (isNetwork ? Object.keys(URLS) : Object.keys(CHAINS)).map(
    (chainId) => Number(chainId)
  )
  const { desiredChainId, switchChain } = useChainSwitch(connector.name)

  const connectHandler = useCallback(() => {
    if (connector instanceof WalletConnect || connector instanceof Network)
      connector
        .activate(desiredChainId === -1 ? undefined : desiredChainId)
        .then(() => setError(undefined))
        .catch(setError)
    else {
      console.log(connector)
      Promise.resolve(
        (async () => {
          connector.connector.activate(
            // @ts-ignore
            desiredChainId === -1
              ? undefined
              : getAddChainParameters(desiredChainId)
          )
        })()
      )
        .then(() => setError(undefined))
        .catch(setError)
    }
  }, [connector, desiredChainId, setError])

  const disconnectHandler = () => {
    setError(undefined)
    if (connector.connector?.deactivate) {
      void connector.connector.deactivate()
    } else {
      void connector.connector.resetState()
    }
  }

  return (
    <ChainSelect
      title={error ? "Try Again?" : isActive ? "Disconnect" : "Connect"}
      onClick={isActive ? disconnectHandler : connectHandler}
      chainId={desiredChainId}
      loading={isActivating}
      switchChain={switchChain}
      displayDefault={displayDefault}
      chainIds={chainIds}
    />
  )
}

export default ConnectWithSelect
