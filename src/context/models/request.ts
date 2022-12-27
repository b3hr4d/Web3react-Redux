import { createModel } from "@rematch/core"
import type { RootModel } from "../store"

const defaultStates = window.REQUEST

const wallet = createModel<RootModel>()({
  state: defaultStates,
  reducers: {
    setRequest: (state, payload) => {
      return {
        ...state,
        ...payload,
      }
    },
  },
  effects: (dispatch) => ({
    async fetchRequest() {
      // TODO make api to fetch request data
    },
  }),
})

export default wallet
