import { Actions } from "@web3-react/types"
import { WalletConnect } from "@web3-react/walletconnect"
import { URLS } from "../../context/data/web3/chains"

export default (actions: Actions) =>
  new WalletConnect({
    actions,
    options: {
      rpc: URLS,
    },
  })
