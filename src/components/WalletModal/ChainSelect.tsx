import { CHAINS } from "../../context/data/web3/chains"

interface ChainSelectProps {
  title: string
  chainId?: number
  switchChain: (chainId: number) => void | undefined
  onClick?: () => void
  displayDefault: boolean
  disabled?: boolean
  loading?: boolean
  chainIds: number[]
}

const ChainSelect: React.FC<ChainSelectProps> = ({
  chainId,
  switchChain,
  displayDefault,
  title,
  chainIds,
  loading,
  ...rest
}) => {
  return (
    <div className="flex flex-row justify-between items-center w-full">
      <div className="form-control flex flex-row justify-between items-center w-full">
        <select
          id="chain-select"
          value={chainId}
          onChange={(event) => {
            switchChain(Number(event.target.value))
          }}
          disabled={switchChain === undefined}
        >
          {displayDefault ? <option value={-1}>Default Chain</option> : null}
          {chainIds.map((chainId) => (
            <option key={chainId} value={chainId}>
              {CHAINS[chainId]?.name ?? chainId}
            </option>
          ))}
        </select>
      </div>
      <button {...rest}>{title}</button>
    </div>
  )
}

export default ChainSelect
