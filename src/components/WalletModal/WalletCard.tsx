import { useEffect, useState } from "react"
import { ConnectorName } from "../../context/data/web3/types"
import {
  useAccounts,
  useChainId,
  useIsActivating,
  useIsActive,
} from "../../context/hooks/useWeb3"
import { getConnector } from "../../hooks/useConnector"
import Accounts from "./Accounts"
import Chain from "./Chain"
import ConnectWithSelect from "./ConnectWithSelect"
import Status from "./Status"

interface WalletCardProps {
  connectorName: ConnectorName
}

const WalletCard: React.FC<WalletCardProps> = ({ connectorName }) => {
  const chainId = useChainId(connectorName)
  const accounts = useAccounts(connectorName)
  const isActivating = useIsActivating(connectorName)

  const isActive = useIsActive(connectorName)

  const connector = getConnector(connectorName)

  useEffect(() => {
    Promise.resolve(
      (async () => {
        if (connector.connectEagerly) await connector.connectEagerly()
        else await connector.activate()
      })()
    ).catch(() =>
      console.debug(`Failed to connect eagerly to ${connectorName}`)
    )
  }, [])

  const [error, setError] = useState<Error>()

  return (
    <div className="flex flex-6 flex-col justify-between items-center p-2 m-2 border border-primary rounded">
      connector:{connectorName}
      <div>
        <div>
          <Status
            isActivating={isActivating}
            isActive={isActive}
            error={error}
          />
          <Chain chainId={chainId} />
          <Accounts accounts={accounts} />
        </div>
        <div>
          <ConnectWithSelect
            connectorName={connectorName}
            connector={connector}
            chainId={chainId}
            isActivating={isActivating}
            isActive={isActive}
            error={error}
            setError={setError}
          />
        </div>
      </div>
    </div>
  )
}

export default WalletCard
