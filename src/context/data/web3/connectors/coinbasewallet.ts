import { CoinbaseWallet } from "@web3-react/coinbase-wallet"
import { Actions } from "@web3-react/types"
import { initializeConnector } from "../../../hooks/useWeb3"
import { URLS } from "../chains"

export default initializeConnector<CoinbaseWallet>(
  "CoinbaseWallet",
  (actions: Actions) =>
    new CoinbaseWallet({
      actions,
      onError: (error: Error) => {
        console.error(error)
      },
      options: {
        url: URLS[1][0],
        appName: "hivpn",
      },
    })
)
