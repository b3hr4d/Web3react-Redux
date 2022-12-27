import connectors from "../Connectors"
import { ConnectorName, Web3Connectors } from "../context/data/web3/types"
import useWeb3, { getIsActive, useWeb3WithKey } from "../context/hooks/useWeb3"

export const getConnector = (
  key: ConnectorName
): Web3Connectors[ConnectorName] => connectors[key]

export const useConnectorByName = (key: ConnectorName) => {
  const connector = getConnector(key)
  const states = useWeb3WithKey(key)

  const account = states?.accounts?.[0]
  const provider = connector?.provider

  return { connector, provider, ...states, account }
}
export const useWeb3Keys = () => {
  const web3 = useWeb3()
  return Object.keys(web3) as ConnectorName[]
}

export function getActiveConnectorsKey() {
  const web3 = useWeb3Keys()
  return web3.find(getIsActive) as ConnectorName
}

export function getPriorityConnector() {
  const keys = Object.keys(connectors) as ConnectorName[]
  const key = keys.find(getIsActive)

  return key || "Network"
}

const useConnector = () => {
  const key = getPriorityConnector()
  return useConnectorByName(key)
}

export default useConnector
