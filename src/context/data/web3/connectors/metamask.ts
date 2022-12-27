import { MetaMask } from "@web3-react/metamask"
import { Actions } from "@web3-react/types"
import { initializeConnector } from "../../../hooks/useWeb3"

export default initializeConnector<MetaMask>(
  "MetaMask",
  (actions: Actions) => new MetaMask({ actions })
)
