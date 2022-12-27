import { GnosisSafe } from "@web3-react/gnosis-safe"
import { Actions } from "@web3-react/types"
import { initializeConnector } from "../../../hooks/useWeb3"

export default initializeConnector<GnosisSafe>(
  "GnosisSafe",
  (actions: Actions) => new GnosisSafe({ actions })
)
