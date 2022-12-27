import { IsActivatingType, IsActiveType } from "../../context/hooks/useWeb3"

interface StatusProps {
  isActivating: IsActivatingType
  isActive: IsActiveType
  error?: Error
}

const Status: React.FC<StatusProps> = ({ isActivating, isActive, error }) => {
  return (
    <p>
      {error ? (
        <span>
          🔴 {error.name ?? "Error"}
          {error.message ? `: ${error.message}` : null}
        </span>
      ) : isActivating ? (
        "🟡 Connecting"
      ) : isActive ? (
        "🟢 Connected"
      ) : (
        "⚪️ Disconnected"
      )}
    </p>
  )
}

export default Status
