import { Url } from "@web3-react/url"
import { initializeConnector } from "../../../hooks/useWeb3"
import { URLS } from "../chains"

export default initializeConnector(
  "Url",
  (actions) => new Url({ actions, url: URLS[1][0] })
)
