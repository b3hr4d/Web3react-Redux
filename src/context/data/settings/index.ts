export interface Translate {
  x: number
  y: number
  height: number
  width: number
}

export interface SettingsState {
  translate: Translate
  loading: boolean
  showAddress: boolean
  showSnackBar: boolean
  snackbar: SnackBarType
  showDetails: boolean
  user: string
  modal: boolean
}

export type SnackBarType = {
  title?: string
  severity?: "error" | "warning" | "info" | "success"
  message: string
}
