import { useSelector } from "react-redux"
import { SnackBarType, Translate } from "../data/settings"
import store, { RootState } from "../store"

export const setModal = (modal: boolean) =>
  store.dispatch.settings.SET_MODAL(modal)

export const setLoading = (loading: boolean) =>
  store.dispatch.settings.SET_LOADING(loading)

export const setShowSnackbar = (snackbar: boolean) =>
  store.dispatch.settings.SHOW_SNACKBAR(snackbar)

export const setShowAddress = () => store.dispatch.settings.SHOW_ADDRESS()

export const setShowDetails = () => store.dispatch.settings.SHOW_DETAILS()

export const setSnackbar = (props: SnackBarType) =>
  store.dispatch.settings.SET_SNACKBAR(props)

export const setUser = (user: string) =>
  store.dispatch.settings.CHANGE_ADDRESS(user)

export const resetTree = () => store.dispatch.settings.resetTree()

export const setTranslate = (translate: Translate) =>
  store.dispatch.settings.SET_TRANSLATE(translate)

const useSettings = () => useSelector((state: RootState) => state.settings)

export default useSettings
