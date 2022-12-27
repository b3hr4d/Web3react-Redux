import { Network } from "@web3-react/network"
import { Actions } from "@web3-react/types"
import { initializeConnector } from "../../../hooks/useWeb3"
import { URLS } from "../chains"

export default initializeConnector<Network>(
  "Network",
  (actions: Actions) =>
    new Network({ actions, urlMap: URLS, defaultChainId: 56 })
)
