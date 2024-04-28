import { Typography } from "@mui/material"
import { IsActivatingType, IsActiveType } from "../../context/hooks/useWeb3"

interface StatusProps {
  isActivating: IsActivatingType
  isActive: IsActiveType
  error?: Error
}

const Status: React.FC<StatusProps> = ({ isActivating, isActive, error }) => {
  return (
    <Typography variant="overline">
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
    </Typography>
  )
}

export default Status
