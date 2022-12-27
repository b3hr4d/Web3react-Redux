import { CHAINS, URLS } from "../../context/data/web3/chains"
import useChainSwitch from "../../hooks/useChainSwitch"

interface ChainChangerProps {}

const ChainChanger: React.FC<ChainChangerProps> = () => {
  const { chainId, switchChain } = useChainSwitch()

  const chainIds = Object.keys(URLS)

  return (
    <select
      onChange={(event) => {
        switchChain(Number(event.target.value))
      }}
      value={chainId}
    >
      {chainIds.map((chainId: any) => (
        <option key={chainId} value={chainId}>
          {CHAINS[chainId]?.name ?? chainId}
        </option>
      ))}
    </select>
  )
}

export default ChainChanger
