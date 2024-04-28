import { Card, Grid, Modal } from "@mui/material"
import Box from "@mui/material/Box"
import { useState } from "react"
import Connectors from "../../connector"
import { useSigner } from "../../context/hooks/useContract"
import useWallet from "../../context/hooks/useWallet"
import WalletCard from "./WalletCard"
interface WalletModalProps {
  connectors: Connectors
  open: boolean
  onClose: (open: boolean) => void
}

const WalletModal: React.FC<WalletModalProps> = ({
  connectors,
  open,
  onClose,
}) => {
  const [signedMessage, setSignedMessage] = useState<string>("")

  const signer = useSigner()

  const { account } = useWallet()

  return (
    <Modal open={open} onClose={() => onClose(false)} disableEnforceFocus>
      <Box m={2}>
        <Card>
          <Grid p={2} container>
            {connectors.getConnectorNames().map((connector) => (
              <WalletCard key={connector} name={connector} icon="" />
            ))}
          </Grid>
        </Card>
      </Box>
    </Modal>
  )
}

export default WalletModal
