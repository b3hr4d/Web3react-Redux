import { getAddress } from "@ethersproject/address"
import { createModel } from "@rematch/core"
import { Web3ReactState, Web3ReactStateUpdate } from "@web3-react/types"
import { AVAILABLE_CONNECTORS } from "../data/web3"
import { ConnectorName } from "../data/web3/types"
import { RootModel } from "../store"

export const MAX_SAFE_CHAIN_ID = 4503599627370476

function validateChainId(chainId: number): void {
  if (
    !Number.isInteger(chainId) ||
    chainId <= 0 ||
    chainId > MAX_SAFE_CHAIN_ID
  ) {
    throw new Error(`Invalid chainId ${chainId}`)
  }
}

function validateAccount(account: string): string {
  return getAddress(account)
}

export type Web3ReactStateWithKey = Web3ReactStateUpdate & {
  key: ConnectorName
}

export interface ConnectorState extends Web3ReactState {}

const defaultValues: ConnectorState = {
  chainId: undefined,
  accounts: undefined,
  activating: false,
}

const defaultState = AVAILABLE_CONNECTORS.reduce(
  (acc, key) => ({ ...acc, [key]: defaultValues }),
  {} as Record<ConnectorName, ConnectorState>
)

const nullifier = AVAILABLE_CONNECTORS.reduce(
  (acc, key) => ({ ...acc, [key]: 0 }),
  {} as Record<ConnectorName, number>
)

const web3 = createModel<RootModel>()({
  state: defaultState,
  reducers: {
    RESET: (state, key: ConnectorName) => {
      nullifier[key]++
      return { ...state, [key]: defaultState[key] }
    },
    UPDATE: (state, payload: Web3ReactStateWithKey) => {
      const { key } = payload
      // determine the next chainId and accounts
      const chainId = payload.chainId ?? state[key].chainId
      const accounts = payload.accounts ?? state[key].accounts

      // ensure that the activating flag is cleared when appropriate
      let activating = state[key].activating
      if (activating && chainId && accounts) {
        activating = false
      }

      return { ...state, [key]: { chainId, accounts, activating } }
    },
    START_ACTIVATION: (state, key: ConnectorName) => {
      return { ...state, [key]: { ...state[key], activating: true } }
    },
    STOP_ACTIVATION: (state, key: ConnectorName) => {
      return { ...state, [key]: { ...state[key], activating: false } }
    },
  },
  effects: (dispatch) => ({
    startActivation: (key: ConnectorName) => {
      const nullifierCached = ++nullifier[key]

      dispatch.web3.START_ACTIVATION(key)

      // return a function that cancels the activation iff nothing else has happened
      return () => {
        if (nullifier[key] === nullifierCached)
          dispatch.web3.STOP_ACTIVATION(key)
      }
    },
    update: (payload: Web3ReactStateWithKey) => {
      // validate chainId statically, independent of existing state
      if (payload.chainId !== undefined) {
        validateChainId(payload.chainId)
      }

      // validate accounts statically, independent of existing state
      if (payload.accounts !== undefined) {
        for (let i = 0; i < payload.accounts.length; i++) {
          payload.accounts[i] = validateAccount(payload.accounts[i])
        }
      }

      nullifier[payload.key]++
      dispatch.web3.UPDATE(payload)
    },
  }),
})

export default web3
