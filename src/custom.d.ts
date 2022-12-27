declare module "*.svg" {
  export default React.FunctionComponent<React.SVGAttributes<SVGElement>>
}

declare module "*.png"
declare module "*.svg"
declare module "*.jpeg"
declare module "*.jpg"

declare var REQUEST: {
  infuraKey: string
  quickKey: string
  invoice_id: string
  amount: string
  callback: string
  on_new: string
  sign_message: string
  tolerance: string
  update_price: string
  explorer_tron: string
  default_chain: "bsc" | "tron"
  dollar_price: string
  explorer_bsc: string
  contract_tron: string
  contract_bsc: string
  on_renew: string
}

declare var IS_DEV: boolean
declare var IS_SERVE: boolean
declare var APP_VERSION: string
