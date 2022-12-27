import { useSelector } from "react-redux"
import { RootState } from "../store"

const useLoading = () => useSelector((state: RootState) => state.loading)

export const useEffectLoading = () => useLoading().effects

export const useSettingLoading = () => useLoading().effects.settings

export const useContractLoading = () => useLoading().effects.contract

export const useWalletLoading = () => useLoading().effects.wallet

export const useRequestLoading = () => useLoading().effects.request

export default useLoading
