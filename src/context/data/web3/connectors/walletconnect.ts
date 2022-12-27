import { Actions } from "@web3-react/types"
import { WalletConnect } from "@web3-react/walletconnect"
import { initializeConnector } from "../../../hooks/useWeb3"
import { URLS } from "../chains"

export default initializeConnector<WalletConnect>(
  "WalletConnect",
  (actions: Actions) =>
    new WalletConnect({
      actions,
      options: {
        rpc: URLS,
      },
    })
)
