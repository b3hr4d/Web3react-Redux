import { createModel } from "@rematch/core"
import { SnackBarType, Translate } from "../data/settings"
import { RootModel } from "../store"

const defaultState: any = {
  showSnackBar: false,
  showDetails: false,
  showAddress: true,
  modal: false,
  snackbar: {
    message: "",
  },
}

const settings = createModel<RootModel>()({
  state: defaultState,
  reducers: {
    SET_MODAL: (state, modal: boolean) => ({
      ...state,
      modal,
    }),
    SET_SNACKBAR: (state, snackbar: SnackBarType) => ({
      ...state,
      snackbar,
      showSnackBar: true,
    }),
    SET_LOADING: (state, loading: boolean) => ({
      ...state,
      loading,
    }),
    SET_TRANSLATE: (state, translate: Translate) => ({
      ...state,
      loading: false,
      translate,
    }),
    SHOW_SNACKBAR: (state, showSnackBar: boolean) => {
      return {
        ...state,
        showSnackBar,
      }
    },
    SHOW_ADDRESS: (state) => {
      return {
        ...state,
        showAddress: !state.showAddress,
      }
    },
    SHOW_DETAILS: (state) => {
      return {
        ...state,
        showDetails: !state.showDetails,
      }
    },
    CHANGE_ADDRESS: (state, user: string) => {
      return {
        ...state,
        user,
      }
    },
  },

  effects: (dispatch) => ({
    resetTree: () => {
      dispatch.settings.SET_LOADING(true)
    },
  }),
})

export default settings
