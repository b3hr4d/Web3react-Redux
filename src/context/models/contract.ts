import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers"
import { createModel } from "@rematch/core"
import { Contract, Transaction } from "ethers"
import B3Pay from "../../contracts/payment.json"
import { RootModel } from "../store"

interface ContractState {
  contract: Contract | null
  transaction: Transaction | null
  initialized: boolean
}

const state: ContractState = {
  contract: null,
  transaction: null,
  initialized: false,
}

type InitParams = {
  provider: Web3Provider
  withSigner: boolean
}

const B3PAY_ETH = new Contract(
  "0x0000000000000000000000000000000000000000",
  B3Pay.abi
)
const B3PAY_TRON = new Contract(
  "0x0000000000000000000000000000000000000000",
  B3Pay.abi
)

const contract = createModel<RootModel>()({
  state,
  reducers: {
    INIT: (_, contract: Contract) => ({
      contract,
      transaction: null,
      initialized: true,
    }),
    UNSET: () => ({ ...state, contract: null, initialized: false }),
    PAY: (state, transaction) => ({ ...state, transaction }),
    DONE: (state) => ({ ...state, transaction: null }),
    APPROVE: (state, transaction) => ({ ...state, transaction }),
  },
  effects: (dispatch) => ({
    init: async ({ provider, withSigner }: InitParams) => {
      let contract: Contract
      let signer: JsonRpcSigner | Web3Provider = provider

      if (withSigner) signer = provider.getSigner()
      if (provider._network.name === "tron") {
        contract = B3PAY_TRON.connect(signer)
      } else {
        contract = B3PAY_ETH.connect(signer)
      }

      dispatch.contract.INIT(contract)

      const accounts = await provider.listAccounts()
      if (accounts.length > 0) {
        dispatch.wallet.SET_ACCOUNT(accounts[0])
      }

      provider.on("accountsChanged", (accounts) => {
        console.log(accounts)
        if (accounts.length > 0) {
          dispatch.wallet.SET_ACCOUNT(accounts[0])
        }
      })

      provider.on("chainChanged", (chainId) => {
        dispatch.wallet.SET_CHAIN_ID(chainId)
      })

      provider.on("networkChanged", (networkId) => {
        dispatch.wallet.SET_NETWORK(networkId)
      })

      provider.on("message", (message) => {
        dispatch.wallet.SET_MESSAGE(message)
      })

      provider.on("disconnect", (code, reason) => {
        dispatch.wallet.SET_DISCONNECT({ code, reason })
      })

      provider.on("error", (error) => {
        dispatch.wallet.SET_ERROR(error)
      })

      provider.on("transactionHash", (tx) => {
        dispatch.wallet.SET_TRANSACTION_HASH(tx)
      })

      provider.on("transactionSent", (tx) => {
        dispatch.wallet.SET_TRANSACTION_SENT(tx)
      })

      provider.on("transactionConfirmed", (tx) => {
        dispatch.wallet.SET_TRANSACTION_CONFIRMED(tx)
      })

      provider.on("transactionReceipt", (tx) => {
        dispatch.wallet.SET_TRANSACTION_RECEIPT(tx)
      })

      provider.on("transactionFailed", (tx) => {
        dispatch.wallet.SET_TRANSACTION_FAILED(tx)
      })
    },
    pay: async (payload, rootState) => {
      const { contract, initialized } = rootState.contract
      if (!initialized) return
      const tx = await contract?.pay(payload)
      dispatch.contract.PAY(tx)
      await tx.wait(6)
      dispatch.contract.DONE()
    },
    approve: async (payload, rootState) => {
      const { contract, initialized } = rootState.contract
      if (!initialized) return
      const tx = await contract?.approve(payload)
      dispatch.contract.APPROVE(tx)
      await tx.wait(6)
      dispatch.contract.DONE()
    },
    disconnect: (_, rootState) => {},
  }),
})

export default contract
