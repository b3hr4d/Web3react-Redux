import { URLS } from "@/context/data/web3/chains"
import { Network } from "@web3-react/network"
import { Actions } from "@web3-react/types"

export default (actions: Actions) =>
  new Network({ actions, urlMap: URLS, defaultChainId: 56 })
