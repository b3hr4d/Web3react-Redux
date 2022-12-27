import { init, Models, RematchDispatch, RematchRootState } from "@rematch/core"
import loadingPlugin, { ExtraModelsFromLoading } from "@rematch/loading"
import contract from "./models/contract"
import request from "./models/request"
import settings from "./models/settings"
import wallet from "./models/wallet"
import web3 from "./models/web3"

export type Store = typeof store

type FullModel = ExtraModelsFromLoading<RootModel>

export type Dispatch = RematchDispatch<RootModel>
export type RootState = RematchRootState<RootModel, FullModel>

export interface RootModel extends Models<RootModel> {
  web3: typeof web3
  wallet: typeof wallet
  request: typeof request
  contract: typeof contract
  settings: typeof settings
}

export const models: RootModel = {
  web3,
  wallet,
  settings,
  contract,
  request,
}

const store = init<RootModel, FullModel>({ models, plugins: [loadingPlugin()] })

export default store
