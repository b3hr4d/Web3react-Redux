import { URLS } from "@/context/data/web3/chains"
import { Actions } from "@web3-react/types"
import { Url } from "@web3-react/url"

export default (actions: Actions) => new Url({ actions, url: URLS[1][0] })
