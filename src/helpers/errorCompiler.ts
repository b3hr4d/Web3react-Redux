import errors from "../contracts/error.json"

type ContractError = keyof typeof errors

export const errorCompiler = (err: any) => {
  switch (typeof err) {
    case "string":
      return err.replace(/<[^>]+>/g, "")
    case "object":
      // eslint-disable-next-line no-case-declarations
      let message = err?.data?.message || err?.message
      if (message) {
        const msg = message.replace("execution reverted: ", "") as ContractError

        if (msg.length === 3) return errors[msg]
        else if (msg.includes("message")) {
          const msg = message.match(/(\b[A-Z][A-Z]+|\b[A-Z]\b)/g)
          const e = msg.find((e: string) =>
            Object.keys(errors).includes(e)
          ) as ContractError
          return errors[e]
        } else if (err.reason) return err.reason
        else if (msg.includes("err:")) return msg.replace("err: ", "")
        else if (msg.includes("MetaMask Tx Signature:")) {
          const m = msg.replace("MetaMask Tx Signature: ", "")
          return m
        } else return msg
      } else {
        return "Error Not Found!"
      }
    default:
      return "Error Not Found!"
  }
}
