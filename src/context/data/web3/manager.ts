import { ConnectorUpdate } from "@web3-react/types6"
import { normalizeAccount, normalizeChainId } from "./normalizers"
import { AbstractConnector } from "./types"

export class StaleConnectorError extends Error {
  constructor() {
    super()
    this.name = this.constructor.name
  }
}

export class UnsupportedChainIdError extends Error {
  public constructor(
    unsupportedChainId: number,
    supportedChainIds?: readonly number[]
  ) {
    super()
    this.name = this.constructor.name
    this.message = `Unsupported chain id: ${unsupportedChainId}. Supported chain ids are: ${supportedChainIds}.`
  }
}

export async function augmentConnectorUpdate(
  connector: AbstractConnector,
  update: ConnectorUpdate
): Promise<ConnectorUpdate<number>> {
  const provider =
    update.provider === undefined
      ? await connector.getProvider()
      : update.provider
  const [_chainId, _account] = (await Promise.all([
    update.chainId === undefined ? connector.getChainId() : update.chainId,
    update.account === undefined ? connector.getAccount() : update.account,
  ])) as [
    Required<ConnectorUpdate>["chainId"],
    Required<ConnectorUpdate>["account"]
  ]

  const chainId = normalizeChainId(_chainId)
  if (
    !!connector.supportedChainIds &&
    !connector.supportedChainIds.includes(chainId)
  ) {
    throw new UnsupportedChainIdError(chainId, connector.supportedChainIds)
  }
  const account = _account === null ? _account : normalizeAccount(_account)

  return { provider, chainId, account }
}
