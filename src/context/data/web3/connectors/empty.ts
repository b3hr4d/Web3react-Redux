import { Empty, EMPTY } from "@web3-react/empty"
import { initializeConnector } from "../../../hooks/useWeb3"

export default initializeConnector<Empty>("Empty", () => EMPTY)
