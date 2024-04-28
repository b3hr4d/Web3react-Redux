import { MetaMask } from "@web3-react/metamask"
import { Actions } from "@web3-react/types"

export default (actions: Actions) => new MetaMask({ actions })
