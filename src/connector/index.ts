import {
  ConnectorArray,
  ConnectorDetail,
  ConnectorDetails,
  ConnectorName,
} from "@/context/data/web3/types"
import { initializeConnector } from "@/context/hooks/useWeb3"
import { dynamicLoader } from "./import"

export default class Connectors {
  private detail: ConnectorDetails = []
  private names: ConnectorName[] = []

  constructor(neededConnectors: ConnectorArray) {
    this.names = neededConnectors
  }

  async init() {
    for await (const name of this.names) {
      await dynamicLoader(name).then((Connector) => {
        console.log(Connector)
        const connector = initializeConnector(name, Connector.default)

        this.detail.push({
          name: name,
          icon: `./assets/wallet/${name}.svg`,
          connector,
        })
      })
    }
  }

  getConnector(name: ConnectorName) {
    if (!this.names.includes(name))
      throw new Error(`Connector ${name} is not available`)

    return this.detail.find(
      (connector) => connector.name === name
    ) as ConnectorDetail
  }

  getConnectorNames() {
    return this.names
  }

  getConectorNamesAndIcon() {
    return this.detail.map(({ name, icon }) => ({
      name,
      icon,
    }))
  }

  getAvailableConnectors() {
    return this.detail
  }
}
