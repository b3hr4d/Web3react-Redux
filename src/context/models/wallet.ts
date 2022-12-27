import { createModel } from "@rematch/core"
import type { RootModel } from "../store"

interface WalletState {
  balances: {
    [key: string]: string
  }
  prices: {
    [key: string]: string
  }
  allowance: {
    [key: string]: string
  }
  account: string
  network: string
  chainId: number
  message: string
  blockNumber: number
  pending: boolean
  transactionHash: string
  transactionSent: boolean
  transactionConfirmed: boolean
  transactionReceipt: any
  transactionFailed: boolean
  disconnect: boolean
  error: string
}

const defaultStates: WalletState = {
  balances: {},
  prices: {},
  allowance: {},
  account: "",
  network: "",
  chainId: 0,
  message: "",
  blockNumber: 0,
  pending: false,
  transactionHash: "",
  transactionSent: false,
  transactionConfirmed: false,
  transactionReceipt: {},
  transactionFailed: false,
  disconnect: false,
  error: "",
}

const wallet = createModel<RootModel>()({
  state: defaultStates,
  reducers: {
    SET_BALANCES: (state, payload) => {
      return {
        ...state,
        balances: payload,
      }
    },
    SET_PRICES: (state, payload) => {
      return {
        ...state,
        prices: payload,
      }
    },
    SET_ALLOWANCE: (state, payload) => {
      return {
        ...state,
        allowance: payload,
      }
    },
    SET_ACCOUNT: (state, payload) => {
      return {
        ...state,
        account: payload,
      }
    },
    SET_NETWORK: (state, payload) => {
      return {
        ...state,
        network: payload,
      }
    },
    SET_CHAIN_ID: (state, payload) => {
      return {
        ...state,
        chainId: payload,
      }
    },
    SET_MESSAGE: (state, payload) => {
      return {
        ...state,
        message: payload,
      }
    },
    SET_DISCONNECT: (state, payload) => {
      return {
        ...state,
        disconnect: payload,
      }
    },
    SET_ERROR: (state, payload) => {
      return {
        ...state,
        error: payload,
      }
    },
    SET_BLOCK_NUMBER: (state, payload) => {
      return {
        ...state,
        blockNumber: payload,
      }
    },
    SET_PENDING: (state, payload) => {
      return {
        ...state,
        pending: payload,
      }
    },
    SET_TRANSACTION_HASH: (state, payload) => {
      return {
        ...state,
        transactionHash: payload,
      }
    },
    SET_TRANSACTION_SENT: (state, payload) => {
      return {
        ...state,
        transactionSent: payload,
      }
    },
    SET_TRANSACTION_CONFIRMED: (state, payload) => {
      return {
        ...state,
        transactionConfirmed: payload,
      }
    },
    SET_TRANSACTION_RECEIPT: (state, payload) => {
      return {
        ...state,
        transactionReceipt: payload,
      }
    },
    SET_TRANSACTION_FAILED: (state, payload) => {
      return {
        ...state,
        transactionFailed: payload,
      }
    },
  },
  effects: (dispatch) => ({
    updateBalances: (payload) => {
      dispatch.wallet.SET_BALANCES(payload)
    },
    updatePrices: (payload) => {
      dispatch.wallet.SET_PRICES(payload)
    },
    updateAllowance: (payload) => {
      dispatch.wallet.SET_ALLOWANCE(payload)
    },
  }),
})

export default wallet
