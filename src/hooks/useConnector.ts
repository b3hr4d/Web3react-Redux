import { connectors } from "../App"
import { ConnectorName } from "../context/data/web3/types"
import useWeb3, { getIsActive, useWeb3WithKey } from "../context/hooks/useWeb3"

export const useConnectorByName = (key: ConnectorName) => {
  const connector = connectors.getConnector(key)
  const states = useWeb3WithKey(key)

  const account = states?.accounts?.[0]
  const provider = connector.connector.provider

  return { connector: connector.connector, provider, ...states, account }
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

  return key || "network"
}

const useConnector = () => {
  const key = getPriorityConnector()
  return useConnectorByName(key)
}

export default useConnector
