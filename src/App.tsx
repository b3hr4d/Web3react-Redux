import { utils } from "ethers"
import { useState } from "react"
import WalletModal from "./components/WalletModal"
import { NEEDED_CONNECTORS } from "./Connectors"
import { fromWie } from "./helpers"
import useBalances from "./hooks/useBalances"
import useConnector from "./hooks/useConnector"

function App() {
  const [open, setOpen] = useState<boolean>(false)
  const [signature, setSignature] = useState<string>("")

  const { provider, account, activating, accounts } = useConnector()

  const balances = useBalances(accounts)

  const signMessage = async () => {
    if (provider) {
      const msg = "Hello World"
      const msgParams = [msg, account]
      const sig = (await provider.request({
        method: "personal_sign",
        params: msgParams,
      })) as string

      setSignature(sig)
    }
  }

  const sendTransaction = async () => {
    if (provider) {
      const tx = {
        from: account,
        to: "0x167F27341960aC14080F430d60fb6322bAed18Fe",
        data: "0x",
        value: utils.parseEther("0.01").toHexString(),
      }

      const txHash = await provider.request({
        method: "eth_sendTransaction",
        params: [tx],
      })

      console.log(txHash)
    }
  }

  return (
    <div
      className="container space-top-1 space-bottom-1 space-top-lg-3"
      style={{
        backgroundColor: "var(--main-bg)",
      }}
    >
      {activating ? (
        <p>Activating...</p>
      ) : (
        <div className="text-center">
          <button className="btn btn-primary m-2" onClick={() => setOpen(true)}>
            Open
          </button>
          <br />
          <button className="btn btn-primary m-2" onClick={signMessage}>
            Sign
          </button>
          <br />
          <button className="btn btn-primary m-2" onClick={sendTransaction}>
            Send
          </button>
          <br />
          <p>
            {account}
            <br />
            {fromWie(balances?.[0], 18)}
            <br />
            {signature}
            <br />
          </p>
        </div>
      )}
      <WalletModal
        connectors={NEEDED_CONNECTORS}
        open={open}
        onClose={setOpen}
      />
    </div>
  )
}

export default App
