import { BigNumber, utils } from "ethers"

export const getEllipsis = (str?: string, n = 4) =>
  str && `${str.slice(0, n)}...${str.slice(str.length - n)}`.toLowerCase()

let timer: NodeJS.Timeout

export const throttle = (func: () => void, wait = 300) => {
  clearTimeout(timer)
  timer = setTimeout(() => func(), wait)
}

export const compileResult = (values: any): any => {
  if (typeof values === "string") return values
  if (values instanceof BigNumber) return values.toString()
  if (values.length === 1) return values[0].map((v: BigNumber) => v.toString())

  return Object.entries(values).reduce(
    (acc: any, [key, value]: any) =>
      key.length > 1
        ? {
            ...acc,
            [key]:
              value instanceof BigNumber
                ? value.toString()
                : value.map((v: any) => compileResult(v)),
          }
        : acc,
    []
  )
}

export const minimizer = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export const usdToToken = (usd: number, decimal: number) => {
  return (usd * 10 ** decimal).toFixed()
}

export const fromWie = (value: any, decimal = 8, fixed = 4) =>
  value && Number(utils.formatUnits(value, decimal)).toFixed(fixed)

export const toWie = (value: any) => value && Number(utils.formatEther(value))

export const toUsd = (value: any, format = true, maximumFractionDigits = 2) => {
  if (isNaN(Number(value))) return 0
  return format
    ? Number(fromWie(Math.floor(value), 8)).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits,
      })
    : Number(fromWie(Math.floor(value), 8))
}
