import { CoinbaseWallet } from "@web3-react/coinbase-wallet"
import { Actions } from "@web3-react/types"
import { URLS } from "../../context/data/web3/chains"

export default (actions: Actions) =>
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
