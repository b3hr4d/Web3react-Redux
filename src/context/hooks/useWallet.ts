import { useSelector } from "react-redux"
import store, { RootState } from "../store"

const useWallet = () => useSelector((state: RootState) => state.wallet)

export const setChainId = (chainId: number) =>
  store.dispatch.wallet.SET_CHAIN_ID(chainId)

export const setAccount = (account: string) =>
  store.dispatch.wallet.SET_ACCOUNT(account)

export const disconnect = () => store.dispatch.wallet.SET_ACCOUNT("")

export default useWallet
