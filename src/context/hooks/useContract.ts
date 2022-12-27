import { Web3Provider } from "@ethersproject/providers"
import { useSelector } from "react-redux"
import store, { RootState } from "../store"

export const setContract = (provider: Web3Provider, withSigner = false) =>
  store.dispatch.contract.init({ provider, withSigner })

export const unsetContract = () => store.dispatch.contract.UNSET()

const useContract = () => useSelector((state: RootState) => state.contract)

export const useTransaction = () => useContract().contract?.transaction

export const useProvider = () => useContract().contract?.provider

export const useSigner = () => useContract().contract?.signer

export default useContract
