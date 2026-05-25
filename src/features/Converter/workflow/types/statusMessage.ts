type StatusMessageVariant = 'idle' | 'info' | 'success' | 'error'

export type StatusMessageState = {
  variant: StatusMessageVariant
  text: string
}

export const IDLE_STATUS_MESSAGE: StatusMessageState = {
  variant: 'idle',
  text: '',
}
