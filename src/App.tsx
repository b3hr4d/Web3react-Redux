import Connectors from "@/connector"
import { CircularProgress, Container } from "@mui/material"
import { useEffect, useState } from "react"

export const connectors = new Connectors(["network"])
console.log(connectors)

function App() {
  const [open, setOpen] = useState<boolean>(true)
  const [connectorLoading, setConnectorLoading] = useState<boolean>(true)

  useEffect(() => {
    setConnectorLoading(true)
    connectors.init().then(() => {
      console.log("init")
      setConnectorLoading(false)
    })
  }, [])

  return (
    <Container maxWidth="md" disableGutters>
      {connectorLoading ? (
        <CircularProgress />
      ) : (
        connectors.getConectorNamesAndIcon().map((connector) => (
          <div key={connector.name}>
            <img src={connector.icon} alt={connector.name} width="50" />
            <p>{connector.name}</p>
          </div>
        ))

        // <WalletModal connectors={connectors} open={open} onClose={setOpen} />
      )}
    </Container>
  )
}

export default App
