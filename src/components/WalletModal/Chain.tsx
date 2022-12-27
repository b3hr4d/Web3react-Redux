import { CHAINS } from "../../context/data/web3/chains"
import { ChainIdType } from "../../context/hooks/useWeb3"
interface ChainProps {
  chainId: ChainIdType
}

const Chain: React.FC<ChainProps> = ({ chainId }) => {
  if (chainId === undefined) return null

  const name = chainId ? CHAINS[chainId]?.name : undefined

  return (
    <div>
      {name ? (
        <p>
          Chain:&nbsp;
          <b>
            {name} ({chainId})
          </b>
        </p>
      ) : (
        <p>
          Chain Id:&nbsp;
          <b>{chainId}</b>
        </p>
      )}
    </div>
  )
}

export default Chain
