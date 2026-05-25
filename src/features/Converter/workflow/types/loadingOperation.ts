export const LoadingOperationType = {
  NONE: 'none',
  PROCESSING: 'processing',
  DOWNLOADING: 'downloading',
} as const

export type LoadingOperationType = (typeof LoadingOperationType)[keyof typeof LoadingOperationType]
