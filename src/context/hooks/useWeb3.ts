import {
  Actions,
  Connector,
  Web3ReactState,
  Web3ReactStateUpdate,
} from "@web3-react/types"
import { useSelector } from "react-redux"
import { ConnectorName } from "../data/web3/types"
import { Web3ReactStateWithKey } from "../models/web3"
import store, { RootState } from "../store"

export function initializeConnector<T extends Connector>(
  key: ConnectorName,
  f: (actions: Actions) => T
): T {
  const connector = f({
    startActivation: () => startActivation(key),
    update: (payload: Web3ReactStateUpdate) => update({ ...payload, key }),
    resetState: () => reset(key),
  })

  return connector
}

export const useWeb3WithKey = (key: ConnectorName) =>
  useSelector((state: RootState) => state.web3[key])

export const reset = (key: ConnectorName) => store.dispatch.web3.RESET(key)

export const update = (payload: Web3ReactStateWithKey) =>
  store.dispatch.web3.update(payload)

export const startActivation = (key: ConnectorName) =>
  store.dispatch.web3.startActivation(key)

export const useChainId = (key: ConnectorName) => useWeb3WithKey(key)?.chainId

export const useAccounts = (key: ConnectorName) => useWeb3WithKey(key)?.accounts

export const useIsActivating = (key: ConnectorName) =>
  Boolean(useWeb3WithKey(key)?.activating)

export const getChainId = (key: ConnectorName) =>
  store.getState().web3[key]?.chainId

export const getAccounts = (key: ConnectorName) =>
  store.getState().web3[key]?.accounts

export const getIsActivating = (key: ConnectorName) =>
  Boolean(store.getState().web3[key]?.activating)

export const getIsActive = (key: ConnectorName): boolean => {
  const chainId = getChainId(key)
  const accounts = getAccounts(key)
  const activating = getIsActivating(key)

  return computeIsActive({
    chainId,
    accounts,
    activating,
  })
}
export const useIsActive = (key: ConnectorName): boolean => {
  const chainId = useChainId(key)
  const accounts = useAccounts(key)
  const activating = useIsActivating(key)

  return computeIsActive({
    chainId,
    accounts,
    activating,
  })
}

function computeIsActive({ chainId, accounts, activating }: Web3ReactState) {
  return Boolean(chainId && accounts && !activating)
}

export type AccountType = ReturnType<typeof useAccounts>

export type ChainIdType = ReturnType<typeof useChainId>

export type IsActiveType = ReturnType<typeof useIsActive>

export type IsActivatingType = ReturnType<typeof useIsActivating>

const useWeb3 = () => useSelector((state: RootState) => state.web3)

export default useWeb3
