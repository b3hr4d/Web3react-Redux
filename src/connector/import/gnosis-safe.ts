import { GnosisSafe } from "@web3-react/gnosis-safe"
import { Actions } from "@web3-react/types"

export default (actions: Actions) => new GnosisSafe({ actions })
