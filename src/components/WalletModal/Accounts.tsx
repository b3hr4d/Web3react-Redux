import { formatEther } from "@ethersproject/units"
import { AccountType } from "../../context/hooks/useWeb3"
import { getEllipsis } from "../../helpers"
import useBalances from "../../hooks/useBalances"

interface AccountsProps {
  accounts: AccountType
}

const Accounts: React.FC<AccountsProps> = ({ accounts }) => {
  const balances = useBalances(accounts)

  if (accounts === undefined) return null

  return (
    <div className="d-flex flex-column">
      <p>Accounts:&nbsp;</p>
      <ul>
        {accounts.length === 0
          ? "None"
          : accounts?.map((account, i) => (
              <li key={account}>
                {getEllipsis(account)}
                {balances?.[i] ? ` (Ξ${formatEther(balances[i])})` : null}
              </li>
            ))}
      </ul>
    </div>
  )
}

export default Accounts
