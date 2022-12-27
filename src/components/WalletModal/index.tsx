import { utils } from "ethers"
import { useState } from "react"
import { ConnectorArray } from "../../context/data/web3/types"
import { useSigner } from "../../context/hooks/useContract"
import useWallet from "../../context/hooks/useWallet"
import WalletCard from "./WalletCard"

interface WalletModalProps {
  connectors?: ConnectorArray
  open: boolean
  onClose: (open: boolean) => void
}

const WalletModal: React.FC<WalletModalProps> = ({
  connectors = ["Network"],
  open,
  onClose,
}) => {
  const [signedMessage, setSignedMessage] = useState<string>("")

  const signer = useSigner()

  const { account } = useWallet()

  const signatureRequest = async () => {
    if (signer) {
      console.log(signer)
      const message = "Hello World"
      const signature = await signer.signMessage(message)
      setSignedMessage(signature)
      console.log(signature)
    }
  }

  const testTransaction = async () => {
    if (signer) {
      const erc20 = new utils.Interface([
        "function approve(address spender, uint256 amount) external returns (bool)",
      ])

      const tx = await signer.sendTransaction({
        to: "0x6b175474e89094c44da98b954eedeac495271d0f",
        data: erc20.encodeFunctionData("approve", [
          "0x6b175474e89094c44da98b954eedeac495271d0f",
          "100000000000000000000000",
        ]),
      })

      console.log(tx)
    }
  }

  return (
    <div
      className="modal-backdrop align-items-center justify-content-center"
      onClick={() => onClose(false)}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: open ? "flex" : "none",
        zIndex: 999,
      }}
    >
      <div
        className="modal-content w-sm-50"
        style={{ backgroundColor: "var(--main-bg)", zIndex: 1000 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h5 className="modal-title">Wallet</h5>
          <div
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={() => onClose(false)}
            style={{ cursor: "pointer" }}
          >
            X
          </div>
        </div>
        {account ? (
          <div className="modal-body">
            <div className="row">
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    value={account}
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="signature" className="form-label">
                    Signature
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="signature"
                    value={signedMessage}
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <button
                    className="btn btn-primary"
                    onClick={signatureRequest}
                  >
                    Sign Message
                  </button>
                </div>
                <div className="mb-3">
                  <button className="btn btn-primary" onClick={testTransaction}>
                    Test Transaction
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="modal-body d-flex flex-wrap justify-content-around text-left overflow-auto"
            style={{ height: "60vh" }}
          >
            {connectors.map((key) => (
              <WalletCard key={key} connectorName={key} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default WalletModal
