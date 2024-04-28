declare module "*.svg" {
  export default React.FunctionComponent<React.SVGAttributes<SVGElement>>
}

declare module "*.png"
declare module "*.svg"
declare module "*.jpeg"
declare module "*.jpg"

declare var IS_DEV: boolean
declare var IS_SERVE: boolean
declare var APP_VERSION: string
