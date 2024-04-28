import MoreVertIcon from "@mui/icons-material/MoreVert"
import { Avatar, Box, CardHeader, Grid, IconButton } from "@mui/material"
import { Stack } from "@mui/system"
import { useEffect, useState } from "react"
import { connectors } from "../../App"
import { ConnectorName } from "../../context/data/web3/types"
import {
  useAccounts,
  useChainId,
  useIsActivating,
  useIsActive,
} from "../../context/hooks/useWeb3"
import Accounts from "./Accounts"
import Chain from "./Chain"
import ConnectWithSelect from "./ConnectWithSelect"
import Status from "./Status"

interface WalletCardProps {
  name: ConnectorName
  icon: string
}

const WalletCard: React.FC<WalletCardProps> = ({ name, icon }) => {
  const chainId = useChainId(name)
  const accounts = useAccounts(name)
  const isActivating = useIsActivating(name)

  const isActive = useIsActive(name)

  const connector = connectors.getConnector(name)

  useEffect(() => {
    Promise.resolve(
      (async () => {
        if (connector.connector.connectEagerly)
          await connector.connector.connectEagerly()
        else await connector.connector.activate()
      })()
    ).catch(() => console.debug(`Failed to connect eagerly to ${name}`))
  }, [])

  const [error, setError] = useState<Error>()

  return (
    <Grid item>
      <CardHeader
        avatar={<Avatar alt={name} src={`./icon/${name}`} />}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <Box p={2}>
        <Stack>
          <Status
            isActivating={isActivating}
            isActive={isActive}
            error={error}
          />
          <Chain chainId={chainId} />
          <Accounts accounts={accounts} />
        </Stack>
        <div>
          <ConnectWithSelect
            connector={connector}
            chainId={chainId}
            isActivating={isActivating}
            isActive={isActive}
            error={error}
            setError={setError}
          />
        </div>
      </Box>
    </Grid>
  )
}

export default WalletCard
